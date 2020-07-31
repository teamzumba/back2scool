const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});


const userSchema ={
  email :String,
  password :String
}


const User = new mongoose.model("User",userSchema);

//landing Page 
app.get("/",function(req,res)
{
  res.render("index")
});

//routes

app.post("/index",function(req,res){
  res.render("home")
});

app.get("/login",function(req,res){
  res.render("home")
});

app.post("/login",function(req,res){
  var subject=req.body.test;
  const username = req.body.username;
 const password = req.body.password;
 console.log(username);
 console.log(subject);
 console.log(password);
 User.findOne({email :username},function(err, foundUser){
  if (err) {
     console.log(err);
  } else{
     if(foundUser.password === password && subject === "mathbee"){
             res.render("mathbee");
        console.log(foundUser.password);

      }else if(foundUser.password === password && subject === "spellbee")
      {
        res.render("spellbee")
      }else{
        console.log("error")
      }
   }
   });
   
 });
app.get("/mathbee",function(req,res){
  res.render("home");
});
app.get("/spellbee",function(req,res){
  res.render("home");
});


app.listen(3000,function()
{
    console.log("listening on 3000");
});