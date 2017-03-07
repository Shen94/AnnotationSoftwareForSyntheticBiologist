var express = require("express");
var app= express();
var path=require('path');
var bodyParser= require('body-parser');

app.use(express.static(__dirname + '/views'));

app.get("/Test",function(req,res){
    console.log(req.url);
    console.log("Testing");
 
    res.redirect("/Location");
    res.end();
})

app.get("/Location",function(req,res){
    res.send("Hehe");
})

app.listen(3000,"127.0.0.1",() => {
    console.log(`Server is listerning on localhost port 3000`);
});