import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientInvestmentClass } from './investment.class';

import { InvestmentSchema } from './../../../models/client/investment/investment.model';
import { DepositBalanceSchema } from '../../../models/client/balance/deposit-balance.model';
import { WithdrawalSchema } from '../../../models/client/withdrawal/withdrawal.model';


const InvestmentModel = mongoose.model('Investmnt', InvestmentSchema);
const DepositBalanceModel = mongoose.model('deposit-balance', DepositBalanceSchema);
const WithdrawalModel = mongoose.model('Withdrawal-request', WithdrawalSchema);

export class ClientInvestmentController extends ClientInvestmentClass { 

    constructor() {
        super()
    }

    // Handle client cashout investment from deposit balance
    public cashoutInvestmentFromDepositBalance (request: Request, response: Response, next: NextFunction) {  

        // Check authentication
        if (request.isAuthenticated()) {

            // get total amount of client deposit

            DepositBalanceModel.find({  clientId: request.body.clientId }, (error, balance) => {
                if (error) {
                  response.status(501).json({message: 'Balance records could not be retrieved, service error occured'});
                } 
                
                // sum of total deposit balance
                const currentDepositBalanceInDB = super.getCurrentBalance(balance);
                
                if (super.isAccountBalanceFounded(request.body.amount, currentDepositBalanceInDB)) { // check if balance is sufficient for investment

                    // save
                    const newCashoutInvestment: any = new InvestmentModel(request.body); 
    
                    newCashoutInvestment.save((error: any, data: any) => {
                        if (error){
                            response.status(501).json({message: 'Investment transaction failed'});
                        }

                        // Update current deposit balance

                        // currentDepositBalance = currentBalanceInDB - investmentAmount

                        const currentDepositBalance = currentDepositBalanceInDB - request.body.amount;

                        DepositBalanceModel.findOneAndUpdate({ clientId: request.body.clientId }, { balance: currentDepositBalance }, 
                            {new: true, useFindAndModify: false}, (error, updatedDepositBalance) => {
                            if (error){
                                response.status(501).json({message: 'Balance update was not saved, service error occured'});
                            }
                            response.status(200).json({message: 'done', data: updatedDepositBalance});
                            
                        });
                    });
    
                } else {
                    response.status(501).json({message: 'Insufficient deposit account balance, fund your account to continue'});
                }
                  
              });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }


    // Get client investment histories
    public investmentHistories(request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            InvestmentModel.find({ clientId: request.params.clientId }).populate({path: 'wager games', populate: {path: 'games'}}).exec((error, investments) => {
                if (error){
                    response.status(501).json({message: 'Investment could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: investments});
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }


    // Handle client cashout/cashup investment from withdrawable balance
    public investmentFromWithdrawableBalance (request: Request, response: Response, next: NextFunction) {  

        // Check authentication
        if (request.isAuthenticated()) {

            // find client investments to get total profit made
            InvestmentModel.find({ clientId: request.body.clientId }).populate({path: 'wager games', populate: {path: 'games'}}).exec( (error, investments) => {
                if (error){
                    response.status(501).json({message: 'Investment records could not be retrieved, service error occured'});
                }

                // total profit made from closed deals
                let totalProfit: number = 0;

                // get the start date for each investment
                investments.forEach((investment: any) => {
                    
                    //const numberOfDaysPast: number = super.numberOfDaysPast(investment.start);
                    const isClosedDeals: boolean = super.isClosedDeals(investment.start, investment.period);

                    // Check if its a closed deal
                    if (isClosedDeals) {
                        if (investment.plan === 'Cashout') {
                            const cashoutProfit = investment.period * investment.amount * super.get_X_Percent(2); // 2% of amount
                            totalProfit = totalProfit + cashoutProfit + investment.amount;
                        }
                        if (investment.plan === 'Cashup') {
                            const cashupProfit =  investment.period * investment.amount * super.get_X_Percent(1); // 1% of amount
                            totalProfit = totalProfit + cashupProfit + investment.amount;
                        }
                        if (investment.plan === 'Wager') {

                            const wagerProfit = super.getWagerPayout(investment.wager, investment.wager.odd, investment.amount);
                            // total profit = wager odd * invested amount - 2% of service charge
                            totalProfit = totalProfit + wagerProfit ;
                        }
                    }
                    
                });

                // find client withdrawal to get total withdrawals made
                WithdrawalModel.find({ clientId: request.body.clientId }, (error, withdrawals) => {
                    if (error){
                        response.status(501).json({message: 'Withdrawal records could not be retrieved, service error occured'});
                    }

                    // total withdraws made so far
                    let totalWithdraws: number = 0;

                    withdrawals.forEach((withdrawal: any) => {

                        if (withdrawal.withdrawStatus === 'completed' || withdrawal.withdrawStatus === 'pending') {
                            totalWithdraws = totalWithdraws + withdrawal.withdrawAmount;
                        }

                    })

                    // client withdrawableBalance = all profit made - all withdraws made 
                    const currentWithdrawableBalanceInDB = totalProfit - totalWithdraws;

                    if (super.isAccountBalanceFounded(request.body.amount, currentWithdrawableBalanceInDB)) { // check if balance is sufficient for investment

                        // save
                        const newCashoutInvestment: any = new InvestmentModel(request.body); 
        
                        newCashoutInvestment.save((error: any, data: any) => {
                            if (error){
                                response.status(501).json({message: 'Investment transaction failed'});
                            }

                            // Update current withdrawable balance

                            // currentWithdrawableBalance = currentWithdrawableBalanceInDB - investmentAmount

                            const currentWithdrawableBalance = currentWithdrawableBalanceInDB - request.body.amount;

                            // effect current investmented amount from withdrawable balance as withdrawal 

                            const withdrawableToInvest: any = {
                                clientId: request.body.clientId,
                                withdrawAmount: request.body.amount,
                                accountNo: 'none',
                                bankName: 'reinvested',
                                withdrawStatus: 'completed'
                            }

                            const withdrawal: any = new WithdrawalModel(withdrawableToInvest); 

                            withdrawal.save((error: any, data: any) => {
                                if (error){
                                    response.status(501).json({message: 'Withdraw request was not successful, service error occured'});
                                } 
                                response.status(200).json({message: 'done', data: data});
                            });

                        })

                    } else {
                        response.status(501).json({message: 'Insufficient withdrawable account balance, fund your account to continue'});
                    }

                });
                 
                
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }

    }


    // Handle client wager investment from deposit balance
    public wagerInvestFromDeposit (request: Request, response: Response, next: NextFunction) {  

        // Check authentication
        if (request.isAuthenticated()) {

            // get total amount of client deposit
            DepositBalanceModel.find({  clientId: request.body.clientId }, (error, balance) => {
                if (error) {
                  response.status(501).json({message: 'Balance records could not be retrieved, service error occured'});
                } 
                
                // sum of total deposit balance
                const currentDepositBalanceInDB = super.getCurrentBalance(balance);
                
                if (super.isAccountBalanceFounded(request.body.amount, currentDepositBalanceInDB)) { // check if balance is sufficient for investment

                    // save
                    const newWagerInvestment: any = new InvestmentModel(request.body);  
                    
                    newWagerInvestment.save((error: any, data: any) => {
                        if (error){
                            response.status(501).json({message: 'Investment transaction failed'});
                        }

                        // Update current deposit balance

                        // currentDepositBalance = currentBalanceInDB - investmentAmount

                        const currentDepositBalance = currentDepositBalanceInDB - request.body.amount;

                        DepositBalanceModel.findOneAndUpdate({ clientId: request.body.clientId }, { balance: currentDepositBalance }, 
                            {new: true, useFindAndModify: false}, (error, updatedDepositBalance) => {
                            if (error){
                                response.status(501).json({message: 'Balance update was not saved, service error occured'});
                            }
                            response.status(200).json({message: 'done', data: updatedDepositBalance});
                            
                        });
                    });
    
                } else {
                    response.status(501).json({message: 'Insufficient deposit account balance, found your account to continue'});
                }
                  
              });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
}
