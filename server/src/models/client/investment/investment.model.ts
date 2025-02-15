import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a investment schema
export const InvestmentSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    investedFrom: {
        type: String
    },
    period: {
        type: Number,
        required: true,
        trim: true
    },
    transactionId: { // Note: used as transaction id
        type: Number,
        required: true,
        unique: true
    },
    plan: {
        type: String,
        required: true
    },
    wager: {
        type: Schema.Types.ObjectId, 
        ref: 'Wager',
        //required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    transactionStatus: {
        type: String,
        required: true
    }
});
