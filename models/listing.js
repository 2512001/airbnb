const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const review = require('./reviews.js');
const user = require('./user.js');

const listingSchema = new Schema({
    title: {
        type: String,
        maxLength: 50,
        trim: true
    },
    description: {
        type: String,
        trim: true,

    },
    image: {

        url: String,
        filename: String,
    },
    location: {
        type: String,
        trim:true
    },
    price: {
        type: Number,
        default: 100,
        trim: true,
        required: true
    },
    country: {
        type: String,
        maxLength: 40,
        trim: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'review'
        }
    ],
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    categories : {
        type : String,
        enum :  ['mountain_city', 'lakefront', 'skating', 'beaches', 'camping', 'castles', 'arctics', 'farms', 'trending', 'rooms', 'pools']
    }

});

// listing delete middleware

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        let data = await review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

let listing = mongoose.model('listing', listingSchema);


module.exports = listing;