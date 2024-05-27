const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review =require("./review.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
    },
    image:{
       url: String,
       filename: String,
    },
    price:{
        type: Number,
    },
    location:{
        type: String,
    },
    country:{
        type:String,
    },
    reviews: 
       [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        },
    ],
    Owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // category:{
    //     type: String,
    //     enum :["mountains","trending","rooms","iconic cities","castles","pools","camping","lakefront","farms"],
    // },
   
      
    
});
listingSchema.post("findOneAndDelete", async (listing) =>{
    if(listing) {
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});




const Listing = mongoose.model("Listing",listingSchema);
module.exports= Listing;