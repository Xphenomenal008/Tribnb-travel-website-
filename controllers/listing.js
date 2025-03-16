const listing=require('../model/model.js')


module.exports.index=async(req,res)=>{
const data=await listing.find()
res.render("firstpage.ejs",{data:data})
}

module.exports.create=(req,res)=>{
    console.log("working")
   res.render("listcreate.ejs")
}

module.exports.createformsubmission=async(req,res)=>{//here we will apply schema validation
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
    }

module.exports.openSpecificList=async(req,res)=>{
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
    
    }

    module.exports.editform=async(req,res)=>{
        const {id}=req.params
        console.log(id)
        const data=await listing.findById(id)
        res.render("editlist.ejs",{data:data})
        }

        module.exports.editformSubmit=async(req,res)=>{
        const {id}=req.params
        console.log(id)
        await listing.findByIdAndUpdate(id,{...req.body.listing})
        req.flash("sucess","List has been edited sucessfully!")
        res.redirect("/list")
        }

        module.exports.destroylist=async(req,res)=>{
        const {id}=req.params
        await listing.findByIdAndDelete(id)
        req.flash("sucess","List has been deleted sucessfully!")
        res.redirect("/list")
        }