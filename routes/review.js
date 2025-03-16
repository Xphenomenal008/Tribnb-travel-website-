const express=require("express")
const router=express.Router({mergeParams:true}) //merge true beacuse we need id from app.js to  here
const ExpressError=require("../views/utilities/ExpressError.js");

 const {validating2}=require("../middleware.js")
const wrapAsync=require("../views/utilities/wrapAsync.js")
const {isLoggedIn,isreviewowner}=require("../middleware.js")
const { createReviewandSubmit, destroySpecific } = require("../controllers/review.js")

router.post("",isLoggedIn,validating2,wrapAsync(createReviewandSubmit))

router.delete("/:reviewid",isLoggedIn,isreviewowner,wrapAsync(destroySpecific))



module.exports=router