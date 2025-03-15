const express=require("express")
const engine = require('ejs-mate'); 
  
const methodOverride = require('method-override')
const mongoose=require("mongoose")
const app=express()
const url='mongodb://127.0.0.1:27017/wanderlust'
const session=require("express-session")
const flash=require("connect-flash")

const path=require('path')
app.set('view engine','ejs');
app.set('views', [path.join(__dirname, 'views', 'listing'), path.join(__dirname, 'views', 'user')]);

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.engine('ejs', engine);

 
const ExpressError=require("./views/utilities/ExpressError.js");

const listRoute=require("./routes/listings.js")
const reviewRoute=require("./routes/review.js")
const userRoute=require("./routes/userroute.js")

const cokkieparser=require("cookie-parser");
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require("./model/user.js")
const {isLoggedIn}=require("./middleware.js")

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

 

// app.use(cokkieparser()) ///middleware help to use that cokkies or 



const sessionoptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{ //we save our cookie age in which users id has been saved!!
    expires:Date.now()*7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
  },
}
app.use(session(sessionoptions))//now we can see in our browser an id got store in cokkies!
app.use(flash())

//passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{ //whichever varible from server side to client side we want to use directly we can pass that in locals
  res.locals.sucess=req.flash('sucess');//now we can use this sucess varible anywhere in the ejs file without passing to ejs file
  res.locals.error=req.flash('error')
  res.locals.user=req.user
  next()
})

// app.get("/fake",async(req,res)=>{
//   const fakeuser=new User({
//     email:"rahul@gmail.com",
//     username:"rahul"
//   })
//    let newu=await User.register(fakeuser,"heyworld")
//     res.send(newu)
// })

app.get("/",async(req,res)=>{
//  console.log(req.cookies)//here we using saved cokkie from browser
 res.render("home.ejs")
 
})

app.use("/list",listRoute)
app.use("/list/:id/reviews",reviewRoute)//we did merge true in review file so that we can use id from here to there also
app.use("/list/user",userRoute)

// app.get("/savecokies",(req,res)=>{ //where we saved cokkies in the browser 
//        res.cookie("name","Hari")
//        res.send("saved!!")
// })




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

