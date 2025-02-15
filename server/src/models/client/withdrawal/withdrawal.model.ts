import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a client balance schema
export const WithdrawalSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    withdrawAmount: {
        type: Number,
        required: true,
    },
    accountNo: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    withdrawStatus: {
        type: String,
        required: true,
    },
    withdrawDate: {
        type: Date,
        default: Date.now
    }
})
