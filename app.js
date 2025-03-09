const express=require("express")
const engine = require('ejs-mate'); 
  
const methodOverride = require('method-override')
const mongoose=require("mongoose")
const app=express()
const url='mongodb://127.0.0.1:27017/wanderlust'
const listing=require("./model/model.js")
const path=require('path')
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views', 'listing'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.engine('ejs', engine);
const wrapAsync=require("./views/utilities/wrapAsync.js")
const ExpressError=require("./views/utilities/ExpressError.js");
const { error } = require("console");
const {listingschema}=require("./schema.js")
const {reviewschemas}=require("./schema.js")
const review=require("./model/review.js")
//made connection with our local database
const main=async()=>{
 await mongoose.connect(url);
}
main().then(()=>{
console.log("connected sucessfully!!")
})



//middleware--looger
app.use((req,res,next)=>{
    console.log(req.method,req.path,req.hostname)
    next()

})

// app.use("/api",(req,res,next)=>{
//  let {token}=req.query
//  if(token=="yes"){
//     next()
//  }else{
//     throw new Error('error')
//  }
// })
// app.get("/api",(req,res)=>{
//     res.send("data")
//    })
   


app.get("/",async(req,res)=>{
 res.render("home.ejs")
})

app.get("/list",wrapAsync(async(req,res)=>{
const data=await listing.find()
res.render("firstpage.ejs",{data:data})
}))

app.get("/list/create",(req,res)=>{
     console.log("working")
    res.render("listcreate.ejs")
})


app.get("/list/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
const data=await listing.findById(id).populate("reviews")
console.log(data)
res.render("slist.ejs",{data:data})

}))




app.get("/list/edit/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
console.log(id)
const data=await listing.findById(id)
res.render("editlist.ejs",{data:data})
}))


app.put("/list/edit/form/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
console.log(id)
await listing.findByIdAndUpdate(id,{...req.body.listing})
res.redirect("/list")
}))

app.delete("/list/delete/:id",wrapAsync(async(req,res)=>{
const {id}=req.params
await listing.findByIdAndDelete(id)
res.redirect("/list")
}))

const validating=(req,res,next)=>{//this is where joi is working fo schema validation 
    let {error}=listingschema.validate(req.body)
    if(error){
        throw new ExpressError("400",error)
    }else{
        next()
    }


}
const validating2=(req,res,next)=>{//this is where joi is working fo schema validation 
    let {error}=reviewschemas.validate(req.body)
    if(error){
        throw new ExpressError("400",error)
    }else{
        next()
    }


}


app.post("/list/new",validating, wrapAsync(async(req,res)=>{//here we will apply schema validation
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

app.post("/list/:id/reviews",validating2,wrapAsync(async(req,res)=>{
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

app.delete("/list/:id/review/:reviewid",wrapAsync(async(req,res)=>{
    const {reviewid,id}=req.params
    await listing.findByIdAndUpdate(id,{$pull:{reviews:{_id:reviewid}}})
 await review.findByIdAndDelete(reviewid)
 res.redirect(`/list/${id}`)
}))
 






app.use("*",(req,res,next)=>{
  next(new ExpressError("not found"))

})


app.use((err,req,res,next)=>{
   let{statusCode=500,message="something went wrong"}=err
   res.render("error.ejs",{err:err})
})








app.listen(5000,()=>{
console.log("connected to port 5000 sucessfully!!!")
})

