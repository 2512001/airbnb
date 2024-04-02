const joi = require('joi');

module.exports.listingSchema2 = joi.object({
        listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().min(0).required(),
        country: joi.string().required(),
        location: joi.string().required(),
        image: joi.string().allow("" , null),
        categories:joi.string().allow("" , null)
    }).required()
});

module.exports.reviewSchema = joi.object({
    
    review : joi.object({
    rating: joi.number().min(1).max(5).default(1).required(),
    Comment : joi.string().required(),


    })
})


