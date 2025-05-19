const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require("mongoose");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

//Reviews post route
router.post("/", validateReview, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Posted!!");
    res.redirect(`/listings/${id}`);
}));

//Reviews delete route
router.delete("/:reviewId", wrapAsync(async(req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: new mongoose.Types.ObjectId(reviewId)}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;