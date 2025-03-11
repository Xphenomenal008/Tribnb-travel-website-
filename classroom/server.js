const express=require("express")
const app=express()
const users=require("./routes/user")
const posts=require("./routes/post")
const session=require("express-session")
const flash=require("connect-flash")
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views', 'listing'));
app.use(express.static(path.join(__dirname,'public')))

app.get("/",(req,res)=>{
    res.send("hi iam a root")
})
 app.use(session({
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true
 }))//now we will able to save things inside our session that is session
 app.use(flash())

 app.use("/users",users) //all routes in the user starts from "/users"
 app.use("/posts",posts) //same here happened

 app.get("/reqcount",(req,res)=>{
   let {name="noname"}=req.query   
   req.session.name=name //we are saving data here
   req.flash("success","user register sucessfully")
   res.redirect("/inc")
 })
 
 app.get("/inc",(req,res)=>{
    console.log(req.session)
   let name= req.session.name  //able to use saved data innsession here also!
    res.send(`your name ${name}`)
 })


app.listen(3000,()=>{
    console.log("running sucessfully")
})