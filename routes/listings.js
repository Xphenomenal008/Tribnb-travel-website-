const express=require("express")
const router=express.Router()
const wrapAsync=require("../views/utilities/wrapAsync.js")
const {isLoggedIn}=require("../middleware.js")
const {isowner}=require("../middleware.js")
const {validating}=require("../middleware.js")
const { index, create, openSpecificList, editform, editformSubmit, destroylist, createformsubmission, category } = require("../controllers/listing.js")

const multer=require("multer")
const { storage } = require('../cloudconfig.js'); // Adjust path if necessary
const upload = multer({ storage });// we taking out files from form with help of multer pakage and storing inside the storage of cloudnary!!



router.get("",wrapAsync(index))

//create new list form
router.get("/create",isLoggedIn,create)

//create new list form submission
router.post("/new",upload.single("listing[image]"),validating,wrapAsync(createformsubmission))

router.get("/category",wrapAsync(category))
//open specific list
router.get("/:id",wrapAsync(openSpecificList))


//edit list form
router.get("/edit/:id",isLoggedIn,isowner,wrapAsync(editform))

//edit list
router.put("/edit/form/:id",upload.single("listing[image]"),validating,wrapAsync(editformSubmit))//we uploaded or image,now it returns us link of our image that we have to store in our databse there we acess our image!!

//delete list
router.delete("/delete/:id",isLoggedIn,isowner,wrapAsync(destroylist))




module.exports=router