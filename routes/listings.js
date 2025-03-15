const express=require("express")
const router=express.Router()
const {listingschema}=require("../schema.js")
const wrapAsync=require("../views/utilities/wrapAsync.js")
const listing=require("../model/model.js")
const ExpressError=require("../views/utilities/ExpressError.js");
const { redirect } = require("react-router-dom")
const {isLoggedIn}=require("../middleware.js")
const {isowner}=require("../middleware.js")

const validating=(req,res,next)=>{//this is where joi is working fo schema validation 
    let {error}=listingschema.validate(req.body)
    if(error){
        throw new ExpressError("400",error)
    }else{
        next()
    }


}



router.get("",wrapAsync(async(req,res)=>{
const data=await listing.find()
res.render("firstpage.ejs",{data:data})
}))

router.get("/create",isLoggedIn,(req,res)=>{
     console.log("working")
    res.render("listcreate.ejs")
})

//open specific list
router.get("/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
const data=await listing.findById(id).populate({
    path:"reviews",
    populate:{
        path:"author"
    },
}).populate("owner")//actually in our listing databse obj get store of them so we get out  actual data 
console.log(data)
if(!data){
    req.flash("error","Listing that you have requested does not exists!")
    redirect("/list")
}
res.render("slist.ejs",{data:data})

}))



//edit list form
router.get("/edit/:id",isLoggedIn,isowner,wrapAsync(async(req,res)=>{
const {id}=req.params
console.log(id)
const data=await listing.findById(id)
res.render("editlist.ejs",{data:data})
}))

//edit list
router.put("/edit/form/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
console.log(id)
await listing.findByIdAndUpdate(id,{...req.body.listing})
req.flash("sucess","List has been edited sucessfully!")
res.redirect("/list")
}))

//delete list
router.delete("/delete/:id",isLoggedIn,isowner,wrapAsync(async(req,res)=>{
const {id}=req.params
await listing.findByIdAndDelete(id)
req.flash("sucess","List has been deleted sucessfully!")
res.redirect("/list")
}))

//create new list
router.post("/new",validating, wrapAsync(async(req,res)=>{//here we will apply schema validation
// let result=listingschema.validate(req.body)
// console.log(result)
console.log(req.user)
if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing")
}
let  list= new listing(req.body.listing)
list.owner=req.user._id;  //this is how current login user become owner of newly created list!!
await list.save()
req.flash("sucess","new listing created!")
res.redirect("/list")
}))



module.exports=router