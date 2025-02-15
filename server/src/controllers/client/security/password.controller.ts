import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { ClientSecurityClass } from './security.class';

import { ClientSchema } from '../../../models/client/profile/client.model';

const ClientModel = mongoose.model('Client', ClientSchema);

export class ClientPasswordController extends ClientSecurityClass { 

    constructor() {
        super()
    }

    // Handle client password change
    public changePassword (request: Request, response: Response, next: NextFunction) { 

        // Check authentication
        if (request.isAuthenticated()) { 

            // check password is the same
            if (super.passwordCheck(request.body.currentPassword, request.body.newPassword)) {
               return response.status(501).json({error: 'Your new password must be different from your current password'});
            }

            // check if current password is valid

            // comapare current password to check if its correct
            ClientModel.findById(request.body.clientId, (error: any, client: any) => { 
                if (error) { 
                    response.status(501).json({message: 'An error occured while changin your password, please try again'});
                } else { 
                    bcryptjs.compare(request.body.currentPassword, client.psswd, (error, user) => {
                        if (error){
                            // handle error
                            response.status(501).json({message: 'An error occured while changing your password, please try again'});
                        } 
                        if (user) {

                            // hash client new password
                            bcryptjs.genSalt(10, (error, salt) => {
                                bcryptjs.hash(request.body.newPassword, salt, (error, hashedNewPsswd) => {
                                    if (error){
                                        return response.status(501).json({message: 'Password hashing was not completed'});
                                    }
                                    // set password to hashed
                                    const newPashedPsswd = hashedNewPsswd;

                                    // update password to new password
                                    ClientModel.findOneAndUpdate({ _id: request.body.clientId }, { psswd: newPashedPsswd }, {new: true, useFindAndModify: false}, (error, client) => {
                                        if (error) {
                                            return response.status(501).json({message: 'Password change was not successful, service error occured'});
                                        }
                                        return response.status(200).json({message: 'done', data: client});
                                    })

                                })
                            })

                        } else {
                            // response is OutgoingMessage object that server response http request
                            return response.status(501).json({message: 'Passwords do not match'});
                        }
                    });
                } 
            }); 

        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }
}