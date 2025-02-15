import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientDepositClass } from './deposit.class';

import { DepositSchema } from '../../../models/client/deposit/deposit.model';
import { DepositBalanceSchema } from '../../../models/client/balance/deposit-balance.model';

const DepositModel = mongoose.model('Deposit', DepositSchema);
const DepositBalanceModel = mongoose.model('deposit-balance', DepositBalanceSchema);

export class ClientDepositController extends ClientDepositClass { 

    constructor() {
        super()
    }

    // Handle get client deposit
    public getClientDeposits (request: Request, response: Response, next: NextFunction) {  
        // Check authentication
        if (request.isAuthenticated()) {
            
            DepositModel.find({ clientId: request.params.clientId }, (error, data) => {
                if (error){
                    response.status(501).json({message: 'Deposit records could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: data});
            });
        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
    
    // Handle card deposit
    public cardDeposit (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {
            // save
            const cardDeposit: any = new DepositModel(request.body); 

            if(super.isOutOfDepositRage(request.body.depositAmount)) {
                response.status(501).json({message: 'Deposit amount is out of deposit range'});
            } else {
                cardDeposit.save((error: any, data: any) => {
                    if (error){
                        response.status(501).json({message: 'Deposit transaction was not saved, service error occured'});
                    }    
                    //response.status(200).json({message: 'done', data: data});

                    // save current deposit balance to database

                    // fetch the currentBalanceInDB
                    DepositBalanceModel.find({ clientId: request.body.clientId }, (error, currentBalancesInDB) => {
                        if (error){
                            response.status(501).json({message: 'Balance could not be retrieved, service error occured'});
                        }


                        if (!currentBalancesInDB.length) { // first time deposit - save

                             const currentBalanceObj: any = {
                                clientId: request.body.clientId,
                                balance: request.body.depositAmount
                            } 

                            const depositBalance: any = new DepositBalanceModel(currentBalanceObj); 
                            depositBalance.save((error: any, data: any) => {
                                if (error){
                                    response.status(501).json({message: 'Deposit transaction was not saved, service error occured'});
                                } 
                                response.status(200).json({message: 'done', data: data});
                            });

                        } else { // update balance and save

                            currentBalancesInDB.forEach((currentBalanceInDB: any) => {

                                // add deposit amount to current deposit balance on db
                                // currentBalance  = depositAmount + currentBalanceInDB
                                const currentBalance  = +request.body.depositAmount + +currentBalanceInDB.balance // + cast values into numbers
                                
                                DepositBalanceModel.findOneAndUpdate({ clientId: request.body.clientId }, 
                                    { balance: currentBalance }, 
                                    {new: true, useFindAndModify: false}, (error, currentDepositBalance) => {
                                    if (error){
                                        response.status(501).json({message: 'Balance update was not saved, service error occured'});
                                    }
                                    response.status(200).json({message: 'done', data: currentDepositBalance});
                                    
                                });
                            });
                           
                        }

                    });

                });
            }

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
}
