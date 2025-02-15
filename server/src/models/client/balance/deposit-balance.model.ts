import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a client balance schema
export const DepositBalanceSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        trim: true
    },
    balanceDate: {
        type: Date,
        default: Date.now
    }
});
