const listing=require('../model/model.js')
const review=require("../model/review.js")


 const {validating2}=require("../middleware.js")
module.exports.createReviewandSubmit=async(req,res)=>{//islooged for server side cheking if user login ...and for client side we do diffrently also...called both side validation
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

}

module.exports.destroySpecific=async(req,res)=>{
    const {reviewid,id}=req.params
    await listing.findByIdAndUpdate(id,{$pull:{reviews:{_id:reviewid}}})
 await review.findByIdAndDelete(reviewid)
 req.flash("sucess","review has been deleted sucessfully!")
 res.redirect(`/list/${id}`)
}