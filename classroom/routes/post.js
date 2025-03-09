const express=require("express")
const router=express.Router();

//INDEX-alluser
router.get("",(req,res)=>{
    res.send("get all posts")
})
//INDEX-show user specific one
router.get("/:id",(req,res)=>{
    res.send("get specific posts")
})
//INDEX-post user
router.post("",(req,res)=>{
    res.send("post posts")
})
//INDEX-user
router.delete("/:id",(req,res)=>{
    res.send("delete")
})
module.exports=router