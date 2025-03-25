const mongoose = require("mongoose");
const review=require("./review");
const { string } = require("joi");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
     url:String,
     filename:String
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"review",
    }
  ],
  owner:{ //this is how which each list we attch his user
         type:mongoose.Schema.Types.ObjectId,
         ref:"user" //where all the user has been stored ---ensure your name is same as your collection
  },
  category:{
    type:String,
    enum:["Mountains","Rooms","Farm","Artic","Amazing pools","Camping","Domes","Boats"]
  }
});
schema.post("findOneAndDelete",async(list)=>{
  await review.deleteMany({_id:{$in:list.reviews}})

}) //whichever list of this schema will got delete.... her data recived in this mongoose middleware
//then we will match that delete id with review collections and remove review collwctions also

const Listing = mongoose.model("Listing", schema);
module.exports = Listing;
