import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientFeedbackClass } from './feedback.class';

import {MsgSchema} from './../../../models/client/feedback/message.model';

const MsgModel = mongoose.model('Message', MsgSchema);

export class ClientMessageController extends ClientFeedbackClass { 

    constructor() {
        super()
    }

    // Handle new message saving
    public saveClientMsg (request: Request, response: Response, next: NextFunction) { 

        // Check authentication
        if (request.isAuthenticated()) {

            // instantiate
            const newMsg: any = new MsgModel(request.body);
            // save
            newMsg.save((error: any, msg: any) => {
                if (error){
                    response.status(501).json({message: `Your messages was not saved, please try again`});
                }    
                response.status(200).json({message: 'done', data: msg});
            });
            
        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // get client sent messages
    public getClientSentMsg (request: Request, response: Response, next: NextFunction) { 

        // Check authentication
        if (request.isAuthenticated()) {

            MsgModel.find({ senderId: request.params.clientId }, (error, sentMsg) => {
                if (error){
                    response.status(501).json({message: 'Sent messages could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: sentMsg});
            });
            
        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
    
    // get client recived message
    public getClientReceivedMsg (request: Request, response: Response, next: NextFunction) { 
        // Check authentication
        if (request.isAuthenticated()) {
            MsgModel.find({ receiverId: request.params.clientId }, (error, receivedMsg) => {
                if (error){
                    response.status(501).json({message: 'Recived messages could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: receivedMsg});
            });            
        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // get a single message
    public getSingleMsg (request: Request, response: Response, next: NextFunction) { 
        // Check authentication
        if (request.isAuthenticated()) {
            MsgModel.findById({ _id: request.params.msgId }, (error, aMsg) => {
                if (error){
                    response.status(501).json({message: `Messages could not be retrieved, service error occured`});
                }
                response.status(200).json({message: 'done', data: aMsg});
            });            
        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // delete message
    public deleteMsg (request: Request, response: Response, next: NextFunction) { 
        // Check authentication
        if (request.isAuthenticated()) {

        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // update message
    public updateMsg (request: Request, response: Response, next: NextFunction) { 
        // Check authentication
        if (request.isAuthenticated()) {

        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
}