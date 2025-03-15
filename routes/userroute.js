const express=require("express")
const router=express.Router()
const wrapAsync=require("../views/utilities/wrapAsync.js")
const User=require("../model/user.js");
const passport=require('passport')
const {saveRedirectUrl}=require('../middleware.js')


router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})
router.post("/register",wrapAsync(async(req,res)=>{
    try{
        let{username,email,password}=req.body
        const newUser=new User({email,username})
        const newu=await User.register(newUser,password)
        console.log(newu)
        req.login(newu,(err)=>{//automaticaaly do login new user!!
            if(err){
                return next(err)
            }
            req.flash("sucess","we welcome you!!")
            res.redirect("/list")
        })
       
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/list/user/signup")
    }
    
}))
router.get("/login",wrapAsync(async(req,res)=>{
     res.render("login.ejs")
}))

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/list/user/login",
        failureFlash:"true"
    }),async(req,res)=>{ ///we donnot adding here wrapAsync and another error handling because all errors handled by passport
   req.flash("sucess","welcome back you are logged in sucessfully!!")  
   const redirectUrl = res.locals.redirectUrl || "/list"; 
     res.redirect(redirectUrl);
       
})

router.get("/logout",(req,res,next)=>{ //passport direct functinality..whenever user give req to this page he automatically get logout!!
req.logout((err)=>{
    if(err){
        next(err)
    }
    req.flash("sucess","you are logged out sucessfully!!")
    res.redirect("/list")
})
})



module.exports=router