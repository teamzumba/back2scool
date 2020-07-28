const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//landing Page 
app.get("/",function(req,res)
{
  res.render("index")
});

//routes

app.post("/index",function(req,res)
{
  res.render("login_spellbee")
  app.post("/login_spellbee",function(req,res){
    res.render("spellbee")
  });
});


app.post("/index",function(req,res){
  res.render("home")
  app.post("/home",function(req,res){
    res.render("mathbee")
  });
});



app.get("/spellbee",function(req,res)
{
  res.render("login_spellbee")
  app.post("/login_spellbee",function(req,res){
    res.render("spellbee")
  });
});


app.get("/mathbee",function(req,res)
{
  res.render("home")
  app.post("/home",function(req,res){
    res.render("mathbee")
  });

});





app.listen(3000,function()
{
    console.log("listening on 3000");
})