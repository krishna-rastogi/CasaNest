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

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

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


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    console.log(req.user);
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async(req, res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "iitbhu-student",
//     });

//     let registeredUser = await User.register(fakeUser, "password");
//     res.send(registeredUser);
// });

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

app.listen(8080, ()=>{
    console.log("Server is running");
});