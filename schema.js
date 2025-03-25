const Joi = require('joi');
const review = require('./model/review');
const { category } = require('./controllers/listing');
module.exports.listingschema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required(),
        location:Joi.string().required(),
        category: Joi.string().valid(
            "Amazing pools", "Rooms", "Mountains", "Farm", 
            "Camping", "Domes", "Boats", "Artic"
        ).required()  
        // image: Joi.alternatives().try(Joi.string(), Joi.object())
    }).required(),
      // Multer handles file separately, so this prevents validation failure // Accept empty or missing image (Multer handles the file separately)  // Default value to prevent "undefined" errors
});

module.exports.reviewschemas=Joi.object({
    review:Joi.object({
        rating:Joi.number().max(5).min(1).required(),
        comment:Joi.string().required()

    }).required()
})