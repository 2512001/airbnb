const { listingSchema2  , reviewSchema} = require("../schemavalid");
const listingSchema = require('../models/listing');
const expressError = require('../uitls/expressErr.js');
const review = require("../models/reviews.js");


module.exports.isloggin  = (req, res , next)=>{
    if(!req.isAuthenticated()){
         req.flash('error' , 'please login first!');
         req.session.url = req.originalUrl;
         req.session.method  = req.method 
         req.session.listingid = req.params.id;
         return  res.redirect('/login');
    }
    next();
}

module.exports.savaredirect = (req , res, next)=>{
  if(req.session.url){
    res.locals.redirect = req.session.url;
    res.locals.method = req.session.method;
    res.locals.id = req.session.listingid;
  }
    next();

}

module.exports.isowner = async(req , res, next)=>{
  const id = req.params.id;
  let data  = await listingSchema.findById(id);
  if(data.owner.id.toString('hex') !== res.locals.curruser.id)
    {
      req.flash('error' , 'you cant modify listing you are not owner');
      return  res.redirect(`/listing/${id}`);
  }
  next()
}

module.exports.isreviewauthor = async(req , res, next)=>{
  const {reviewId , id} = req.params;
  let reviews  = await review.findById(reviewId);
if(reviews.author.id.toString('hex') !== res.locals.curruser.id)
{
  req.flash('error' , 'you cant modify listing you are not owner');
  return  res.redirect(`/listing/${id}`);
}
next()

}

//vadlidation of listing and review
module.exports.validlisting = (req, res, next) => {
  const { id } = req.params;
  let result = listingSchema2.validate(req.body);
  if (result.error) {
      throw new expressError(400, "Validation failed: " + result.error.message);
  } else {
      next();
  }
};



module.exports.reviewvalidation = (req, res, next) => {
  let { id } = req.params;
  let { error } = reviewSchema.validate(req.body);
  if (error) {
      throw new expressError(402, "Validation failed: " + error.message);
  } else {
      next();
  }
};