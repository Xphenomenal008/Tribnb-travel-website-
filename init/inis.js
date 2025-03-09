const mongoose=require("mongoose")
const data=require("./init.js")
const listing=require("../model/model.js")
const url='mongodb://127.0.0.1:27017/wanderlust'

//made connection with our local database
const main=async()=>{
await mongoose.connect(url);
}
main().then(()=>{
console.log("connected sucessfully!!")
})

listing.insertMany(data).then(()=>{
   console.log("stored sucessfully!!! ")
}).catch((e)=>{
  console.log(e)
 })




