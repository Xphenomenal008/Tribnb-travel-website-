const express=require("express")
const router=express.Router({mergeParams:true}) //merge true beacuse we need id from app.js to  here
const listing=require("../model/model.js")
const {reviewschemas}=require("../schema.js")
const review=require("../model/review.js")
const wrapAsync=require("../views/utilities/wrapAsync.js")
const {isLoggedIn,isreviewowner}=require("../middleware.js")


const validating2=(req,res,next)=>{//this is where joi is working fo schema validation 
    let {error}=reviewschemas.validate(req.body)
    if(error){
        throw new ExpressError("400",error)
    }else{
        next()
    }


}


router.post("",isLoggedIn,validating2,wrapAsync(async(req,res)=>{//islooged for server side cheking if user login ...and for client side we do diffrently also...called both side validation
    const listid=req.params.id
    const reviewdata=req.body.review //rating:1,comment:"hhh"

    const actuallist=await listing.findById(listid)
    const addreview=new review(reviewdata)
    addreview.author=req.user.id //added current user who logged in as the author of review
    actuallist.reviews.push(addreview)
    await addreview.save()
    await actuallist.save()
    req.flash("sucess","review has been added sucessfully!")
    res.redirect(`/list/${listid}`)
    console.log(listid,reviewdata)

}))

router.delete("/:reviewid",isLoggedIn,isreviewowner,wrapAsync(async(req,res)=>{
    const {reviewid,id}=req.params
     
    
    await listing.findByIdAndUpdate(id,{$pull:{reviews:{_id:reviewid}}})
 await review.findByIdAndDelete(reviewid)
 req.flash("sucess","review has been deleted sucessfully!")
 res.redirect(`/list/${id}`)
}))



module.exports=router