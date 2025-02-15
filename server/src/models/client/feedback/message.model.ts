import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
export const MsgSchema = new Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
    },
    msgSubject: {
        type: String,
        required: true
    },
    msgContent: {
        type: String,
        required: true
    },
    msgCatetory: {
        type: String,
        required: true
    },
    msgDate: {
        type: Date,
        default: Date.now
    }
});
