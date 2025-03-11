const express=require("express")
const router=express.Router()
const {listingschema}=require("../schema.js")
const wrapAsync=require("../views/utilities/wrapAsync.js")
const listing=require("../model/model.js")
const ExpressError=require("../views/utilities/ExpressError.js");

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

router.get("/create",(req,res)=>{
     console.log("working")
    res.render("listcreate.ejs")
})


router.get("/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
const data=await listing.findById(id).populate("reviews")
console.log(data)
res.render("slist.ejs",{data:data})

}))




router.get("/edit/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
console.log(id)
const data=await listing.findById(id)
res.render("editlist.ejs",{data:data})
}))


router.put("/edit/form/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
console.log(id)
await listing.findByIdAndUpdate(id,{...req.body.listing})
res.redirect("/list")
}))

router.delete("/delete/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
await listing.findByIdAndDelete(id)
res.redirect("/list")
}))

router.post("/new",validating, wrapAsync(async(req,res)=>{//here we will apply schema validation
// let result=listingschema.validate(req.body)
// console.log(result)
console.log(req.body)
if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing")
}
const list= new listing(req.body.listing)
await list.save()
res.redirect("/list")
}))



module.exports=router