const express =require('express');

const User = require('../models/credential')
const Admin= require('../models/admin')

const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const session = require('express-session');
const passport=require("passport");

const router = new express.Router();
const app=express();
const bcrypt=require('bcrypt')


app.use(bodyParser.urlencoded({extended : true}));


//initialize(passport);
  app.use(passport.initialize());
  app.use(passport.session());
 
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }))

//TEST
router.get('/test',(req,res)=>{
    res.send("credential working")                                                                                                                                                                                                                                    
})

//ADMIN

router.post('/admin/signup',async (req,res)=>{
    passport.use(Admin.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

    const admin=new Admin({
        username : req.body.username
     });
    //  var password=  req.body.password
    //  function hashPassword(password){
    //     return bcrypt.hashSync(password,bcrypt.genSaltSync())
    // }
    // admin.username=hashPassword(password)
  
    Admin.register({username:req.body.username},req.body.password, function(err,admin)
     {
         //console.log(admin);
        
       // console.log(req.body.password);
        
        // console.log(admin.password);
         if(!err)
         {   
             passport.authenticate("local")(req,res,function()
             {
                 res.send("sucessfully registered Admin");
         
             });
             
         }
         else
         {
             res.send("Invalid credentials admin");
         }
 
     });
        
 
 });

router.post('/admin/login',async (req,res)=>{
    passport.use(Admin.createStrategy());
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(Admin.serializeUser());
    passport.deserializeUser(Admin.deserializeUser());

    const admin= new Admin({
        username: req.body.username,
        password: req.body.password
    });
    //console.log(admin);
        req.login(admin,function(err){
       
        if(!err)
        {
            passport.authenticate("local")(req,res,function()
            {
               res.send("sucessfully login admin");
                
            });
        }
        else
        {
           res.send(err);
            
        }
    })
})

// home page
router.get('/home',async(req,res)=>{

    if(req.isAuthenticated())
    {
        res.render("home");
    }
    else
    {
        res.redirect("/user");
    }

});

//USER
// register
router.post('/user/signup',async (req,res)=>{

    console.log(req.body)


    // use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

   const user=new User({
       username : req.body.username
    });

  

   User.register({username: req.body.username},req.body.password,function(err,user)
    {
        
        if(!err)
        {   
            passport.authenticate("local")(req,res,function()
            {
                res.send("sucessfully registered");
        
            });
            
        }
        else
        {
            res.send("Invalid credentials");
        }

    });
       

});

// login
router.post('/user/signin',async(req,res)=>{
    //console.log(req.body)
    console.log("signed in")
    // use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    const user= new User({
        username: req.body.username,
        password: req.body.password
    });
    
    req.login(user,function(err){
    
        if(!err)
        {
            passport.authenticate("local")(req,res,function()
            {
                res.send("sucessfully login");
                
            });
        }
        else
        {
            res.send(err);
            
        }
    })
 
});

// logout
router.get('/user/logout',function(req,res){
    console.log("I m logout")
    req.logout();
    req.session.destroy();
    res.send("Logout");
})


module.exports = router