//we pass these middlewares whereever they needed..we know they runs after user send req and before sending back res to user!!
const listing=require("./model/model.js")//our collections
const review=require("./model/review.js")//our collections
const {listingschema}=require("./schema.js")//here joi works
const {reviewschemas}=require("./schema.js")
const ExpressError=require("./views/utilities/ExpressError.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){ //this is a passport method if it returns obj mean user data is present mean login or else give undefined mean not have user data
        req.session.redirectUrl = req.originalUrl;//if userlogin his info come from which page he has came and we store that info 
        req.flash("error","please login first")
        return res.redirect("/list/user/login")
    }
    next()

}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isowner=async(req,res,next)=>{
     let {id}=req.params
      let list=await listing.findById(id)//for chking listing owner
      if(!list.owner.equals(req.user._id)){
req.flash("error","you donot have premissions")
     return res.redirect(`/list/${id}`)

      }


    next()
}
module.exports.isreviewowner=async(req,res,next)=>{
     const {reviewid,id}=req.params
      let fondedR=await review.findById(reviewid)//for chking review owner!!
      if(!fondedR.author.equals(req.user._id)){
     req.flash("error","you donot have premissions")
     return res.redirect(`/list/${id}`)

      }


    next()
}

module.exports.validating = (req, res, next) => {
    console.log("🚀 Incoming Request Body:", req.body); // Debugging log
    console.log("📂 Uploaded File:", req.file); // Debugging log for multer

    if (!req.body.listing) {
        return res.status(400).json({ error: "❌ 'listing' is missing from req.body!" });
    }

    const { error } = listingschema.validate(req.body);
    if (error) {
        throw new ExpressError("400",error)
    }

    next();
};



module.exports.validating2=(req,res,next)=>{//this is where joi is working fo schema validation 
    let {error}=reviewschemas.validate(req.body)
    if(error){
        throw new ExpressError("400",error)
    }else{
        next()
    }


}