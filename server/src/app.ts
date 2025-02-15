import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from "passport";
import session from 'express-session';
import connectMongo  from 'connect-mongo';

const MongoStore = connectMongo(session);

// set environment configs
dotenv.config({ path: './server-variables.env' });

import { ConfigPassport } from './config/passport';


class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config(); 
        this.routePrv.routes(this.app); 
        this.mongoSetup();
    }

    private config(): void{
        
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // support application/json type post data
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: ['http://localhost:4200', 'http://www.investbetz.com'],
            credentials: true
        }));

        
        // Bring in passport local strategy
        new ConfigPassport(passport);
        // Express Session
        this.app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
            name: 'investbetz.sid',
            cookie: {
                maxAge: 36000000,
                httpOnly: false,
                secure: false
            },
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }));
        // Passport middleware init
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private mongoSetup(): void{
        //mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds040309.mlab.com:40309/investraz`, { useNewUrlParser: true, useUnifiedTopology: true })

        mongoose.connect(`mongodb+srv://alexim:$ch00lTraz@cluster0.c9z47.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connection successful'))
        .catch((error) => console.error(error));
    }

}

export default new App().app;
