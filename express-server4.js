var express = require("express");
var app= express();
var path=require('path');
var router = express.Router();
var bodyParser= require('body-parser');
var csvtoarray=require('csv-to-array');
var Root_Folder= "RealWork/TestData_Date"
const convertFolder= './RealWork/TestData_Date/20160615/20160615-01_Converted/'
const fs = require('fs');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var jsonParser=bodyParser.json();
function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}
 function findFilesInDir(startPath,filter){

    var results = [];

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            results = results.concat(findFilesInDir(filename,filter)); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
          
            results.push(filename);
        }
    }
    return results;
}

var Directory_Return = Root_Folder;
app.use(express.static(__dirname + '/views'));
app.set('view engine','ejs');


app.get("/JSONData",function(request,response){
    
    console.log("Client Request for JSON data.");
    response.send(jsoncontent);
    console.log("JSON Data sent");
});


app.get("/JSONRequest/:id",function(request,response){
   console.log("Client Request for" + request.params.id);
    ContentsTest=fs.readFileSync(__dirname + "/" + convertFolder + "/" + request.params.id + ".json" );
    JsonContentTest=JSON.parse(ContentsTest);
    response.send(JsonContentTest);
    /*response.send(__dirname + "\RealWork\TestData_Date\20160615\20160615-01_Converted\A1.json");*/
    
});


app.listen(3000,"127.0.0.1",() => {
    console.log(`Server is listerning on localhost port 3000`);
});



Contents = fs.readFileSync(__dirname + "/RealWork/TestData_Date/20160615/20160615-01_Converted/A1.json");
jsoncontent=JSON.parse(Contents);

Directory_Content=fs.readdirSync(__dirname + "/RealWork/TestData_Date");
Directory = findFilesInDir(Root_Folder,'AssayPlate_1.txt');
var Directory_Split=[];
     
for (var t = 0;  t < Directory.length; t++) {
     
     Directory[t]=Directory[t].replace("\\AssayPlate_1.txt",'');
    
}
