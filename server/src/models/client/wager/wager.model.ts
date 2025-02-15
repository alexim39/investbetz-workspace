import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// games schema
export const GamesSchema = new Schema({
    game: Array
})

// create a client balance schema
export const WagerSchema = new Schema({
    games: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Games'
    },
    odd: {
        type: String,
        required: true,
        trim: true
    },
    fullDate: {
        type: String,
        required: true
    }
});

