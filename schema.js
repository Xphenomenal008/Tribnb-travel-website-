const Joi = require('joi');
const review = require('./model/review');
module.exports.listingschema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required(),
        location:Joi.string().required(),
        image: Joi.object({
            url: Joi.string().allow("", null) // Accept empty or null values
        }).default({})  // Default value to prevent "undefined" errors
    }).required(),
});

module.exports.reviewschemas=Joi.object({
    review:Joi.object({
        rating:Joi.number().max(5).min(1).required(),
        comment:Joi.string().required()

    }).required()
})