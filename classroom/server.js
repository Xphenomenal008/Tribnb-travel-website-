const express=require("express")
const app=express()
const users=require("./routes/user")
const posts=require("./routes/post")

app.get("/",(req,res)=>{
    res.send("hi iam a root")
})
 app.use("/users",users) //all routes in the user starts from "/users"
 app.use("/posts",posts) //same here happened



app.listen(3000,()=>{
    console.log("running sucessfully")
})