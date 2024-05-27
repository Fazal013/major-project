const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");



module.exports.isLogedIn= (req,res,next) => {
    if(!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl
       req.flash("error" , "Log in to add a listing!!");
      return  res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async(req,res,next) => {
      
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.Owner.equals(res.locals.currentUser._id)) {
        req.flash("error","You are not the owner of this listing");
       return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let {error} =  listingSchema.validate(req.body);
   if(error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else{
    next();
   }
};



 module.exports.validateReview = (req, res, next) => {
  let {error} =  reviewSchema.validate(req.body);
 if(error) {
  let errMsg = error.details.map((el) => el.message).join(",");
  throw new ExpressError(400,errMsg);
 } else{
  next();
 }
};



module.exports.isreviewAuthor = async(req,res,next) => {
      
  let {id, reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currentUser._id)) {
      req.flash("error","You are not the author of this review");
     return res.redirect(`/listings/${id}`);
  }
  next();
};