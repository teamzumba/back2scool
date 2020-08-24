const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session= require("express-session");
const passport=require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const flash =require("connect-flash")
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use(express.static("public"));
  app.set("view engine","ejs");
  app.use(bodyParser.urlencoded({extended :true}));


  app.use(session({
  secret:"Our little secret",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.set('useUnifiedTopology', true);
mongoose.set("useCreateIndex",true);
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});


const userSchema = new mongoose.Schema({
  email :String,
  password :String
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userSchema);


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//landing Page 
app.get("/",function(req,res)
{
  res.render("index.ejs");
});

//routes
// app.render("index",function(req,res){
  // console.log("html");
// });
app.post("/index",function(req,res){
  res.render("home")
});

app.get("/login",function(req,res){
  res.render("home")
});
app.get("/error",function(req,res){
  res.render("error")
});
app.post("/login",function(req,res){
  var subject=req.body.test;
  const user =new User({
    username:req.body.username,
    password:req.body.password
    
   });
  console.log(subject);

  
  
   req.login(user,function(err){
    if (err) {
      console.log(err);
    }else if(subject==="null")
    {
       res.redirect("/login")
    }
    else{
      passport.authenticate("local",{failureRedirect: '/error' })(req,res,function(){
        if(subject ==="mathbee"){
          res.render("mathbee")
        }else if(subject ==="spellbee"){
          res.render("spellbee")
        }else{
          res.redirect("/login")
        }
        
      })
    }
   })
   
 });
app.get("/mathbee",function(req,res){
  res.render("home");
});
app.get("/spellbee",function(req,res){
  res.render("home");
});

app.get("/about",function(req,res){
  res.render("about");
});
app.get("/gravitas",function(req,res){
  res.redirect("https://gravitas.vit.ac.in/index.html");
})
app.post("/quiz",function(req,res){
  res.render("instruction");
});

app.post("/start",function(req,res){
  var check =req.body
  console.log(check);
  res.render("quiz");
});
app.post("/questions",function(req,res){

  res.render("questions");
});
app.listen(3000,function()
{
    console.log("listening on 3000");
});