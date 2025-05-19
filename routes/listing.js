const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

//Index route
router.get("/", wrapAsync(async(req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}));

//New listing route
router.get("/new", (req, res) => {
    res.render("./listings/new.ejs");
});

//Show route
router.get("/:id", wrapAsync(async(req, res) => {
    let {id} = req.params;

    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Listing doesn't exist!!");
        res.redirect("/listings");
        return;
    }
    res.render("./listings/show.ejs", {listing});
}));

//Create Route
router.post("/", validateListing, wrapAsync(async(req, res, next)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    
    // if(!newListing.title){
    //     throw new ExpressError(400, "Title is missing");
    // }
    // if(!newListing.description){
    //     throw new ExpressError(400, "Description is missing");
    // }
    // if(!newListing.price){
    //     throw new ExpressError(400, "Price is missing");
    // }
    // if(!newListing.location){
    //     throw new ExpressError(400, "Location is missing");
    // }
    // if(!newListing.country){
    //     throw new ExpressError(400, "Country is missing");
    // }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing created!!");
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", wrapAsync(async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing doesn't exist!!");
        res.redirect("/listings");
        return;
    }
    res.render("./listings/edit.ejs", {listing});
}));

//Update Route
router.put("/:id", validateListing, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});

    req.flash("success", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!!");
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;