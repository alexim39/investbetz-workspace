//import mongoose from 'mongoose';
import { Document, Model, model, Types, Schema, Query } from "mongoose"
import {ClientInterface} from './../../../controllers/client.interface';


// create a schema
const ClientSchema: Schema = new Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        index: { unique: true }
    },
    psswd: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    dob: {
        type: String,
    },
    phone: {
        type: String,
        index: { unique: true, sparse: true }
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    accountNo: {
        type: String,
        index: { unique: true, sparse: true },
        max: 12
    },
    bankName: {
        type: String,
    },
    userType: {
        type: String,
        required: true,
        default: 'client' // types of user: client, admin, superAdmin, 
    },
    checkTerms: {
        type: Boolean,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

// set startDate parameter equal to the current time
ClientSchema.pre('save', function (this: ClientInterface, next: any) {
    let now = new Date();
    this.updateDate = now;

    if (!this.startDate) {
        this.startDate = now;
    }
    next();
})

export { ClientSchema }
