import bcryptjs from 'bcryptjs';
import LocalStrategy from "passport-local";

import mongoose from 'mongoose';
import { ClientSchema } from './../models/client/profile/client.model';
import { readSync } from 'fs';

const ClientMongooseModel = mongoose.model('Client', ClientSchema);

export class ConfigPassport {

    constructor (passport: any) {

        passport.use( new LocalStrategy.Strategy({ usernameField: 'email', passwordField: 'psswd'}, (email, psswd, done) => {
            // Match User
            ClientMongooseModel.findOne({ email: email }, (error, user: any) => {
                if (error) { 
                    return done(error); 
                }
                if (!user) {
                    // console.log('email not found')
                    return done(undefined, false, { message: `This email does not exist, confirm the email and try again` });
                }
                // User found
                if (user.active === false) {
                    return done(undefined, false, {message: `This account is not yet active, check your email to activate account`})
                } else {
                    // Match Password
                    bcryptjs.compare(psswd, user.psswd, (error: Error, isMatch: boolean) => {
                        if (error) { 
                            return done(error); 
                        }
                        if (isMatch) {
                            // Password matched
                            return done(undefined, user);
                        }
                        return done(undefined, false, { message: `Authentication failed, confirm your password and try again` });
                    });
                }
                
            });
        }));
        
        passport.serializeUser((user: any, done: any) => {
            done(undefined, user._id);
        });
        
        passport.deserializeUser((id: string, done: any) => {
            ClientMongooseModel.findById(id, (error, user) => {
                done(error, user);
            });
        });

    }
}
