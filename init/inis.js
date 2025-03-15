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


const initdb=async()=>{
   await listing.deleteMany({}); //if exists
  let init= data.map((data)=>({...data,owner:"67d425d8366d1ab235e20acc"}));
  await listing.insertMany(init)
  console.log("init sucess!!")
}
initdb()



