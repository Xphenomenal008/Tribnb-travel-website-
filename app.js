const express=require("express")
const engine = require('ejs-mate'); 
  
const methodOverride = require('method-override')
const mongoose=require("mongoose")
const app=express()
const url='mongodb://127.0.0.1:27017/wanderlust'
 
const path=require('path')
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views', 'listing'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.engine('ejs', engine);
 
const ExpressError=require("./views/utilities/ExpressError.js");
const list=require("./routes/listings.js")
const review=require("./routes/review.js")
const cokkieparser=require("cookie-parser")

//made connection with our local database
const main=async()=>{
 await mongoose.connect(url);
}
main().then(()=>{
console.log("connected sucessfully!!")
})



//middleware--looger
app.use((req,res,next)=>{
    console.log(req.method,req.path,req.hostname)
    next()

})

// app.use("/api",(req,res,next)=>{
//  let {token}=req.query
//  if(token=="yes"){
//     next()
//  }else{
//     throw new Error('error')
//  }
// })
// app.get("/api",(req,res)=>{
//     res.send("data")
//    })

app.use(cokkieparser()) ///middleware help to use that cokkies or parse

app.get("/",async(req,res)=>{
 console.log(req.cookies)//here we using saved cokkie from browser
 res.render("home.ejs")
 
})

app.use("/list",list)
app.use("/list/:id/reviews",review)//we did merge true in review file so that we can use id from here to there also

app.get("/savecokies",(req,res)=>{ //where we saved cokkies in the browser 
       res.cookie("name","Hari")
       res.send("saved!!")
})




app.use("*",(req,res,next)=>{
  next(new ExpressError("not found"))

})


app.use((err,req,res,next)=>{
   let{statusCode=500,message="something went wrong"}=err
   res.render("error.ejs",{err:err})
})








app.listen(5000,()=>{
console.log("connected to port 5000 sucessfully!!!")
})

