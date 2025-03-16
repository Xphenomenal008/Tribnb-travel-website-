const express=require("express")
const router=express.Router()
const wrapAsync=require("../views/utilities/wrapAsync.js")
const {isLoggedIn}=require("../middleware.js")
const {isowner}=require("../middleware.js")
const {validating}=require("../middleware.js")
const { index, create, openSpecificList, editform, editformSubmit, destroylist, createformsubmission } = require("../controllers/listing.js")




router.get("",wrapAsync(index))

//create new list form
router.get("/create",isLoggedIn,create)

//create new list form submission
router.post("/new",validating, wrapAsync(createformsubmission))


//open specific list
router.get("/:id",wrapAsync(openSpecificList))


//edit list form
router.get("/edit/:id",isLoggedIn,isowner,wrapAsync(editform))

//edit list
router.put("/edit/form/:id",wrapAsync(editformSubmit))

//delete list
router.delete("/delete/:id",isLoggedIn,isowner,wrapAsync(destroylist))




module.exports=router