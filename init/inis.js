require('dotenv').config();

console.log("DBURL:", process.env.DBURL);
const mongoose=require("mongoose")
const data=require("./init.js")
const listing=require("../model/model.js")
const url='mongodb://127.0.0.1:27017/wanderlust'
const dbUrl=process.env.DBURL
//made connection with our local database
const main=async()=>{
  mongoose.connect(dbUrl);
}
main().then(()=>{
console.log("connected sucessfully!!")
})


const initdb=async()=>{
   await listing.deleteMany({}); //if exists
  let init= data.map((data)=>({...data,owner:"67d9cbff04e4db9efaf9b26d"}));//
  await listing.insertMany(init)
  console.log("init sucess!!")
}
initdb()



