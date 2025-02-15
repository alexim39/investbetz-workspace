import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
export const DepositSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    depositAmount: {
        type: String,
        required: true
    },
    transactionId: {
        type: Number,
        required: true,
    },
    transactionMethod: {
        type: String,
        required: true,
    },
    transactionStatus: {
        type: String,
        required: true,
    },
    depositDate: {
        type: Date,
        default: Date.now
    }
});
