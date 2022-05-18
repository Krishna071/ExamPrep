const mongoose = require('mongoose')
const passportLocalMongoose=require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
       // required:true,
        trim:true,
        lowercase:true,
        unique:true
        // validate(value){
        //     if(!validator.isEmail(value))
        //         throw new Error('Invalid Email')
        // }
    },
    password:{
        type:String,
       // required:true,
        trim:true,
        minlength:8
        // validate(value){
        //     if(value.toLowerCase().includes('password'))
        //     throw new Error("password must not contain 'password' as a substring");
        // }
    },
  
},{
    timestamps:true
})


// used for salting and hashing and also save info to DB

adminSchema.plugin(passportLocalMongoose);
const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin