const express=require("express")
const router=express.Router()
const wrapAsync=require("../views/utilities/wrapAsync.js")
const User=require("../model/user.js");
const passport=require('passport')
const {saveRedirectUrl}=require('../middleware.js');
const { signup, signupformSubmission, loginformSubmission,login,logout } = require("../controllers/user.js");


router.get("/signup",signup)

router.post("/register",wrapAsync(signupformSubmission))

router.get("/login",wrapAsync(login))

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/list/user/login",
        failureFlash:"true"
    }),loginformSubmission)

router.get("/logout",logout)



module.exports=router