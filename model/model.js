const mongoose = require("mongoose");
const review=require("./review")

const schema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    filename: { type: String, default: "default" },
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/silhouette-of-trees-during-sunset-7Ai0UwqqADs",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"review",
    }
  ]
});
schema.post("findOneAndDelete",async(list)=>{
  await review.deleteMany({_id:{$in:list.reviews}})

}) //whichever list of this schema will got delete.... her data recived in this mongoose middleware
//then we will match that delete id with review collections and remove review collwctions also

const Listing = mongoose.model("Listing", schema);
module.exports = Listing;
