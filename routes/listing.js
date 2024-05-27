const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLogedIn,isOwner,validateListing} =require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });




router.route("/")
.get( wrapAsync(listingController.index))
.post(isLogedIn, upload.single('listing[image]'),validateListing, wrapAsync (listingController.createListing));


 //New Route
 router.get("/new",isLogedIn ,listingController.renderNewForm);
 

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLogedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLogedIn,isOwner, wrapAsync(listingController.destroyListing));


// //Index Route
// router.get("/", wrapAsync(listingController.index));

 
// //Show Route
// router.get("/:id", wrapAsync(listingController.showListing));


//  //Create Route
//  router.post("/",isLogedIn, validateListing, wrapAsync (listingController.createListing));

//Edit Route
router.get("/:id/edit",isLogedIn,isOwner, wrapAsync(listingController.renderEditForm));


// //Update Route
// router.put("/:id",isLogedIn,isOwner, validateListing, wrapAsync(listingController.updateListing));


// //Delete Route
// router.delete("/:id",isLogedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports=router;
