import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a client balance schema
export const AutoWithdrawalSchema = new Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
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
    isAutomatic: {
        type: Boolean,
        required: true,
    },
    isMonthly: {
        type: Boolean,
        required: true,
    },
    autoWithdrawDate: {
        type: Date,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    }
})
