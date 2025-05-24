const mongoose = require("mongoose");
const Listing = require("../models/listing");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

mongoose.connect("mongodb://127.0.0.1:27017/CasaNest");

async function backfillCoordinates() {
  const listings = await Listing.find({ "geometry.coordinates": { $exists: false } });

  for (let listing of listings) {
    if (!listing.location) continue;

    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.location)}`);
    const data = await res.json();

    if (data.length > 0) {
      listing.geometry = {
        type: "Point",
        coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
      };
      await listing.save();
      console.log(`Updated: ${listing.title}`);
    }
  }

  mongoose.connection.close();
}

backfillCoordinates();
