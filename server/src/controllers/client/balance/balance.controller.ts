import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientBalanceClass } from './balance.class';

import { DepositBalanceSchema } from '../../../models/client/balance/deposit-balance.model';
import { InvestmentSchema } from './../../../models/client/investment/investment.model';
import { WithdrawalSchema } from '../../../models/client/withdrawal/withdrawal.model';
import { WagerSchema } from './../../../models/client/wager/wager.model';

const DepositBalanceModel = mongoose.model('Deposit-balance', DepositBalanceSchema);
const InvestmentModel = mongoose.model('investmnt', InvestmentSchema);
const WithdrawalModel = mongoose.model('Withdrawal-request', WithdrawalSchema);
const WagerModel = mongoose.model('Wager', WagerSchema);

export class ClientBalanceController extends ClientBalanceClass { 

    constructor() {
        super()
    }

    // Handle get client deposit balance
    public getClientDepositBalance (request: Request, response: Response, next: NextFunction) {  
        
        // Check authentication
        if (request.isAuthenticated()) {

            DepositBalanceModel.find({ clientId: request.params.clientId }, (error, balance) => {
                if (error){
                    response.status(501).json({message: 'Balance could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: balance});
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // Handle client withdrawable balance
    public calculateClientWithdrawableBalance (request: Request, response: Response, next: NextFunction) {  
        // Check authentication
        if (request.isAuthenticated()) {

            // find client investments to get total profit made
            InvestmentModel.find({ clientId: request.params.clientId }).populate({path: 'wager games', populate: {path: 'games'}}).exec( (error, investments) => {
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
                            // total profit = profit + invested amount
                            totalProfit = totalProfit + cashoutProfit + investment.amount;
                        }
                        if (investment.plan === 'Cashup') {
                            const cashupProfit =  investment.period * investment.amount * super.get_X_Percent(1); // 1% of amount
                            // total profit = profit + invested amount
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
                WithdrawalModel.find({ clientId: request.params.clientId }, (error, withdrawals) => {
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
                    const currentWithdrawableBalance = totalProfit - totalWithdraws;

                    response.status(200).json({message: 'done', data: currentWithdrawableBalance});

                });
                 
                
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

}
