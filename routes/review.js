const express=require("express")
const router=express.Router({mergeParams:true}) //merge true beacuse we need id from app.js to  here
const listing=require("../model/model.js")
const {reviewschemas}=require("../schema.js")
const review=require("../model/review.js")
const wrapAsync=require("../views/utilities/wrapAsync.js")


const validating2=(req,res,next)=>{//this is where joi is working fo schema validation 
    let {error}=reviewschemas.validate(req.body)
    if(error){
        throw new ExpressError("400",error)
    }else{
        next()
    }


}


router.post("",validating2,wrapAsync(async(req,res)=>{
    const listid=req.params.id
    const reviewdata=req.body.review //rating:1,comment:"hhh"
    const actuallist=await listing.findById(listid)
    const addreview=new review(reviewdata)
    actuallist.reviews.push(addreview)
    await addreview.save()
    await actuallist.save()
    res.redirect(`/list/${listid}`)
    console.log(listid,reviewdata)

}))

router.delete("/:reviewid",wrapAsync(async(req,res)=>{
    const {reviewid,id}=req.params
    console.log(reviewid,id)
    
    await listing.findByIdAndUpdate(id,{$pull:{reviews:{_id:reviewid}}})
 await review.findByIdAndDelete(reviewid)
 res.redirect(`/list/${id}`)
}))



module.exports=router