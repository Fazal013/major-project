const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLogedIn, isreviewAuthor}= require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//Reviews
//post review route
router.post("/",isLogedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLogedIn,isreviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports= router;