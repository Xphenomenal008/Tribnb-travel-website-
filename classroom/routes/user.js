const express=require("express")
const router=express.Router();

//INDEX-alluser
router.get("",(req,res)=>{
    res.send("get all users")
})
//INDEX-show user specific one
router.get("/:id",(req,res)=>{
    res.send("get specific users")
})
//INDEX-post user
router.post("",(req,res)=>{
    res.send("post users")
})
//INDEX-user
router.delete("/:id",(req,res)=>{
    res.send("delete users")
})

module.exports=router