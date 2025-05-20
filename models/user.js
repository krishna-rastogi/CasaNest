const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    //salted and hashed username and password will be automatically created by PassportLocalMongoose
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);