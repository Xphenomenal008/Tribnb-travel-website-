const mongoose = require("mongoose");
const review=require("./review");
const passportLocalMongoose=require("passport-local-mongoose")

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
})

UserSchema.plugin(passportLocalMongoose)//this will make automatically schema for user and password in data base
module.exports=mongoose.model("user",UserSchema)