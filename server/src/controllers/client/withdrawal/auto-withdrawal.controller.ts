import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientWithdrawalClass } from './../withdrawal/withdrawal.class';

import { AutoWithdrawalSchema } from '../../../models/client/withdrawal/auto-withdrawal.model';

const AutoWithdrawalModel = mongoose.model('Auto-Withdrawal-request', AutoWithdrawalSchema);

export class ClientAutoWithdrawalController extends ClientWithdrawalClass { 

    constructor() {
        super()
    }

    // Handle save withdraw request
    public saveAutoWithdrawRequest (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            AutoWithdrawalModel.findOne({ clientId: request.body.clientId }).then (user => {
                if (user) {

                    // user exist - only update record
                    AutoWithdrawalModel.findOneAndUpdate({ clientId: request.body.clientId }, request.body, { new: true }, (error, user) => {
                        if (error){
                            response.status(501).json({message: 'Auto withdraw was not updated, service error occured'});
                        }
                        response.status(200).json({message: 'done', data: user});
                    });

                } else {
                    // save
                    const autoWithdrawal: any = new AutoWithdrawalModel(request.body); 

                    autoWithdrawal.save((error: any, user: any) => {
                        if (error){
                            response.status(501).json({message: 'Auto withdraw request was not successful, service error occured'});
                        } 
                        response.status(200).json({message: 'done', data: user});
                    }); 
                }
            })

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }

    }

    // Handle get auto withdraw request
    public getAutoWithdrawRequest (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            AutoWithdrawalModel.find({ clientId: request.params.clientId }, (error, withdrawals) => {
                if (error){
                    response.status(501).json({message: 'Auto Withdrawal records could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: withdrawals});
            })

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // Handle cancel client auto withdrawal request
    public cancelAutoWithdrawRequest (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            AutoWithdrawalModel.findOneAndRemove({ _id: request.params.withdrawId }, (error, data) => {
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