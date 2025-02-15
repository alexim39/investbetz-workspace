import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import passport from "passport";

import { ClientAuthClass } from './auth.class';
// client schema
import { ClientSchema } from './../../../models/client/profile/client.model';
//client interface
import {ClientInterface} from './../../client.interface';
// instantiate model
const ClientModel: Model<ClientInterface> = model('Client', ClientSchema);

// express validator package
//import { body, validationResult } from 'express-validator';

export class ClientAuthController extends ClientAuthClass { 

    constructor() {
        super()
    }

    // Handle sign up
    public newClientSignUp (request: Request, response: Response, next: NextFunction) { 

        ClientModel.findOne({ email: request.body.email }).then (user => {

            if (user) {
                // user exist
                response.status(501).json({message: 'This email has already been signed up, please use another email'});
            } else {

                // instantiate model
                const clientObject: ClientInterface = new ClientModel(request.body); 
                
                bcryptjs.genSalt(10, (error, salt) => {
                    bcryptjs.hash(clientObject.psswd, salt, (error, hashedPsswd) => {
                        if (error){
                           response.status(501).json({message: 'Password hashing was not completed'});
                        }
                        // set password to hashed
                        clientObject.psswd = hashedPsswd;

                        // check if user accepted terms and condition
                        if (request.body.checkTerms === true) {
                            clientObject.save((error: any, client: ClientInterface) => {
                                if (error){
                                    response.status(501).json({message: 'Account creation failed, please check your input and try again'});
                                }    
                                response.status(200).json({message: 'done', data: client});
                            });
                        } else {
                            response.status(501).json({message: 'Please accept and check our Terms and Condition checkbox'});
                        }
                    })
                })
            }
        })
    }

    // Handle sign in
    public clientSignIn (request: Request, response: Response, next: NextFunction) {
        //const {signInEmail, signInPassword} = request.body;

        passport.authenticate('local', (error, user, info) => {
            if(error) {
                return response.status(501).json(error);
            }
            if (!user) {
                return response.status(501).json(info);
            }
            request.logIn(user, (error) => {
                if (error) {
                    return response.status(501).json(error);
                }
                return response.status(200).json({ message: 'done', client: user })
            });
        })(request, response, next);
    }

    // Handle get client
    public getClient (request: Request, response: Response, next: NextFunction) { 

        // Check authentication
        if (request.isAuthenticated()) {
            return response.status(200).json(request.user);
        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // Handle get clients
    public getClients (request: Request, response: Response, next: NextFunction) { 

        // Check authentication
        if (request.isAuthenticated()) {

            ClientModel.find({ }, (error, users) => {
                if (error){
                    response.status(501).json({message: 'Users could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', data: users});
            });

        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

    // Handle sign out
    public clientSignOut (request: Request, response: Response, next: NextFunction) {

        if (request.isAuthenticated()) {
            // Uses passport middleware
            request.logout();
            return response.status(200).clearCookie('investbetz.sid').json({
                message: 'logout',
            })
        } else{
            return response.status(401).json({message: 'Unauthorized request'});
        }       
    }
}
