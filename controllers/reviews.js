const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const mongoose = require("mongoose");

module.exports.createReview = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Posted!!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async(req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: new mongoose.Types.ObjectId(reviewId)}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!!");
    res.redirect(`/listings/${id}`);
};