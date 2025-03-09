
const mongoose = require("mongoose");
const reviewSchema=new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        max:5,
        min:1
    },
    createdate:{
        type:Date,
        default:Date.now()
    },
})

 
module.exports=mongoose.model("review",reviewSchema)