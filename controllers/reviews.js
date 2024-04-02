const review = require('../models/reviews.js');
const listingSchema = require('../models/listing');

module.exports.postreview = async (req, res) => {
    let { id } = req.params;
    let newreview = new review(req.body.review);
    let listing = await listingSchema.findById(id);
    listing.reviews.push(newreview);
    newreview.author  = req.user.id;
    await newreview.save();
    await listing.save();
    req.flash('success' , 'review is created successfuly!');
    res.redirect(`/listing/${id}`);
}

module.exports.deletereview =  async(req, res) => {
    try{
    let { id, reviewId } = req.params;
    await listingSchema.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash('success' , 'review is deleted successfuly!');
    res.redirect(`/listing/${id}`);
    }
    catch(error)
    {
        console.error('Error deleting review:', error);
        req.flash('error', 'An error occurred while deleting the review');
        res.redirect(`/listing/${id}`);
    }
}