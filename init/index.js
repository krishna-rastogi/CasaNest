const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/CasaNest");
}

main()
.then(()=>{
    console.log("Connected successfully to DB");
})
.catch((err) =>{
    console.log(err);
});

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '682b6a7d10e99e32c1ec97f2'}));
    await Listing.insertMany(initData.data);
    console.log("Data initialized");
};
initDB();