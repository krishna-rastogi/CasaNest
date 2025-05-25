if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

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
// const MONGO_URL = "mongodb://127.0.0.1:27017/CasaNest";
const dbUrl = process.env.ATLASDB_URL;

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

async function main(){
    await mongoose.connect(dbUrl);
}
main().then(()=>{
    // console.log("Connected successfully to DB");
}).catch((err) =>{
    console.log(err);
});

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*60*60,
});

store.on("error", (err)=>{
    console.log("Error in MONGO Session store", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true, 
    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // console.log(req.user);
    res.locals.currUser = req.user;
    next();
});

app.get("/", (req, res) => {
  res.redirect("/listings"); // assumes views/home.ejs exists
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/review", reviewsRouter);
app.use("/", userRouter);

// app.all("*",(req, res, next)=>{
//     next(new ExpressError(404, "Page not found!"));
// }); 

app.use((err, req, res, next) => {  //Middleware for error handling
    let {statusCode=500, message="Something went wong!!"} = err;
    res.status(statusCode).render("./listings/error.ejs", {err});
});

const PORT = process.env.PORT || 8080; 
app.listen(PORT, ()=>{
    // console.log("Server is running");
});