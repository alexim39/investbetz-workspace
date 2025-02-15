import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientProfileClass } from './profile.class';

import { ClientSchema } from '../../../models/client/profile/client.model';

const ClientModel = mongoose.model('Client', ClientSchema);


export class ProfileUpdateController extends ClientProfileClass { 

    constructor() {
        super()
    }

    // Handle client profile update
    public updateClientProfile (request: Request, response: Response, next: NextFunction) {  
        // Check authentication
        if (request.isAuthenticated()) {
            ClientModel.findOneAndUpdate({ _id: request.body.clientId }, request.body, { new: true }, (error, data) => {
                if (error){
                    response.status(501).json({error: 'Record was not updated, service error occured'});
                }
                response.status(200).json({message: 'done', data: data});
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // Handle client profile update
    public updateBankDetails (request: Request, response: Response, next: NextFunction) {  
        // Check authentication
        if (request.isAuthenticated()) {

            ClientModel.findOneAndUpdate({ _id: request.body.clientId }, request.body, { new: true }, (error, data) => {
                if (error){
                    response.status(501).json({error: 'Record was not updated, service error occured'});
                }
                response.status(200).json({message: 'done', data: data});
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
}