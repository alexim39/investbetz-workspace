
import { Document, Model, model, Types, Schema, Query } from "mongoose";

export interface ClientInterface extends Document {
    // member property
    firstName: string;
    lastName: string;
    email: string;
    psswd: string;
    active: boolean,
    gender?: string,
    dob?: string,
    phone?: string;
    address?: string;
    city?: string;
    accountNo?: string;
    bankName?: string;
    userType: string;
    readonly checkTerms: boolean; // readonly property cant be changed once they are initialized
    startDate: Date;
    updateDate?: Date;

    // member function
    getFullName?: () => string;
}