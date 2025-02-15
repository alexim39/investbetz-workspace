import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientWithdrawalClass } from './../withdrawal/withdrawal.class';

import { InvestmentSchema } from './../../../models/client/investment/investment.model';
import { WithdrawalSchema } from '../../../models/client/withdrawal/withdrawal.model';

const InvestmentModel = mongoose.model('Investmnt', InvestmentSchema);
const WithdrawalModel = mongoose.model('Withdrawal-request', WithdrawalSchema);

export class ClientWithdrawalController extends ClientWithdrawalClass { 

    constructor() {
        super()
    }

    // Handle save withdraw request
    public saveWithdrawRequest (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            // get current withdrawable balance
            InvestmentModel.find({ clientId: request.body.clientId }).populate({path: 'wager games', populate: {path: 'games'}}).exec( (error, investments) => {
                if (error){
                    response.status(501).json({message: 'Investment records could not be retrieved, service error occured'});
                }

                // total profit made from closed deals
                let totalProfitMade: number = 0;

                // get the start date for each investment
                investments.forEach((investment: any) => {
                    
                    //const numberOfDaysPast: number = super.numberOfDaysPast(investment.start);
                    const isClosedDeals: boolean = super.isClosedDeals(investment.start, investment.period);

                    // Check if its a closed deal
                    if (isClosedDeals) {
                        if (investment.plan === 'Cashout') {
                            const cashoutProfit = investment.period * investment.amount * super.get_X_Percent(2); // 2% of amount
                            totalProfitMade = totalProfitMade + cashoutProfit + investment.amount;
                        }
                        if (investment.plan === 'Cashup') {
                            const cashupProfit =  investment.period * investment.amount * super.get_X_Percent(1); // 1% of amount
                            totalProfitMade = totalProfitMade + cashupProfit + investment.amount;;
                        }
                        if (investment.plan === 'Wager') {
                            const wagerProfit = super.getWagerPayout(investment.wager, investment.wager.odd, investment.amount);
                            // total profit = wager odd * invested amount - 2% of service charge
                            totalProfitMade = totalProfitMade + wagerProfit;
                        }

                    }
                    
                });

                

                // find client withdrawal to get total withdrawals made
                WithdrawalModel.find({ clientId: request.body.clientId }, (error, withdrawals) => {
                    if (error){
                        response.status(501).json({message: 'Withdrawal records could not be retrieved, service error occured'});
                    }

                    // total withdraws made so far
                    let totalWithdrawsAmount: number = 0;

                    withdrawals.forEach((withdrawal: any) => {

                        if (withdrawal.withdrawStatus === 'completed' || withdrawal.withdrawStatus === 'pending') {
                            totalWithdrawsAmount = totalWithdrawsAmount + withdrawal.withdrawAmount;
                        }

                    })

                    // client withdrawableBalance = all profit made - all withdraws made 
                    const currentWithdrawableBalance = totalProfitMade - totalWithdrawsAmount;
                    //console.log(totalProfitMade)
                    //console.log(totalWithdrawsAmount)
                    //console.log(currentWithdrawableBalance)

                    // check if client has sufficient balance
                    if(currentWithdrawableBalance >= request.body.withdrawAmount && currentWithdrawableBalance > 0) {
                        // save
                        const withdrawal: any = new WithdrawalModel(request.body); 
                        withdrawal.save((error: any, data: any) => {
                            if (error){
                                response.status(501).json({message: 'Withdraw request was not successful, service error occured'});
                            } 
                            response.status(200).json({message: 'done', data: data});
                        });

                    // insufficient balance
                    } else {
                        response.status(501).json({message: 'Insufficient withdrawable balance, found your account to continue'});
                    }

                })      

            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }


    // Handle get withdraw request
    public getWithdrawRequest (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            WithdrawalModel.find({ clientId: request.params.clientId }, (error, withdrawals) => {
                if (error){
                    response.status(501).json({message: 'Withdrawal records could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: withdrawals});
            })

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // Handle cancel client withdrawal request
    public cancelWithdrawRequest (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            WithdrawalModel.findOneAndRemove({ _id: request.params.withdrawId }, (error, data) => {
                if (error){
                    response.status(501).json({message: 'Cancel request was not successful, service error occured'});
                }
                response.status(200).json({ message: 'done', data: data});
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
}