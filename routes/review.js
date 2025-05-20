const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require("mongoose");

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");

//Reviews post route
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Posted!!");
    res.redirect(`/listings/${id}`);
}));

//Reviews delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async(req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: new mongoose.Types.ObjectId(reviewId)}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;