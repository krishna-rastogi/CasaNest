const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "/public")));

const mongoose = require("mongoose");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const session = require("express-session");
const flash = require("connect-flash");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/CasaNest");
}
main().then(()=>{
    console.log("Connected successfully to DB");
}).catch((err) =>{
    console.log(err);
});

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true, 
    }
};
app.get("/", (req, res) => {
    res.send("Working fine");
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/listings", listings);
app.use("/listings/:id/review", reviews);

// app.all("*",(req, res, next)=>{
//     next(new ExpressError(404, "Page not found!"));
// }); 

app.use((err, req, res, next) => {  //Middleware for error handling
    let {statusCode=500, message="Something went wong!!"} = err;
    res.status(statusCode).render("./listings/error.ejs", {err});
});

app.listen(8080, ()=>{
    console.log("Server is running");
});