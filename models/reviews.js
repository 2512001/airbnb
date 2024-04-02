const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')

const reviewSchema = new Schema({
    Comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,
        default:1
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    author : {
        
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
});

const review = mongoose.model('review' , reviewSchema);

module.exports = review;

