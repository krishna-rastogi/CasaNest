const Listing = require("../models/listing.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {   
    res.render("./listings/new.ejs");
};

module.exports.showListing = async(req, res) => {
    let {id} = req.params;

    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing doesn't exist!!");
        res.redirect("/listings");
        return;
    }
    // console.log(listing);
    res.render("./listings/show.ejs", {listing});
};

module.exports.createListing = async(req, res, next) => {
    const { listing } = req.body;

    // Geocode the location using openstreetmap
    const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.location)}`
    );
    const geoData = await geoRes.json();

    let coordinates = null;
    if (geoData.length > 0) {
        coordinates = {
            type: "Point",
            coordinates: [
                parseFloat(geoData[0].lon), // longitude
                parseFloat(geoData[0].lat)  // latitude
            ]
        };
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image =  {url, filename};

    newListing.geometry = coordinates;

    let savedListing = await newListing.save();
    // console.log(savedListing);
    req.flash("success", "New Listing created!!");
    res.redirect("/listings");
};

module.exports.editListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing doesn't exist!!");
        res.redirect("/listings");
        return;
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_100");
    res.render("./listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image =  {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!!");
    // console.log(deletedListing);
    res.redirect("/listings");
}