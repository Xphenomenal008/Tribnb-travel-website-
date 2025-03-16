const User=require("../model/user.js");


module.exports.signup=(req,res)=>{
    res.render("signup.ejs")
}
module.exports.signupformSubmission=async(req,res)=>{
    try{
        let{username,email,password}=req.body
        const newUser=new User({email,username})
        const newu=await User.register(newUser,password)
        console.log(newu)
        req.login(newu,(err)=>{//automaticaaly do login new user!!
            if(err){
                return next(err)
            }
            req.flash("sucess","we welcome you!!")
            res.redirect("/list")
        })
       
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/list/user/signup")
    }
    
}

module.exports.login=async(req,res)=>{
    res.render("login.ejs")
}

module.exports.loginformSubmission=async(req,res)=>{ ///we donnot adding here wrapAsync and another error handling because all errors handled by passport
    req.flash("sucess","welcome back you are logged in sucessfully!!")  
    const redirectUrl = res.locals.redirectUrl || "/list"; 
      res.redirect(redirectUrl);
        
 }

 module.exports.logout=(req,res,next)=>{ //passport direct functinality..whenever user give req to this page he automatically get logout!!
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("sucess","you are logged out sucessfully!!")
        res.redirect("/list")
    })
    }