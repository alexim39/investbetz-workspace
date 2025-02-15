import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
export const TestimonialSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    situationBefore: {
        type: String,
        required: true
    },
    resultsFromService: {
        type: String,
        required: true
    },
    coreProblem: {
        type: String,
        required: true
    },
    whatHesitation: {
        type: String,
        required: true
    },
    specificFeatures: {
        type: String,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    },
    anythingElse: {
        type: String,
        required: true
    },
    testimonialCheck: {
        type: Boolean,
        required: true
    },
    testimonialDate: {
        type: Date,
        default: Date.now
    }
});
