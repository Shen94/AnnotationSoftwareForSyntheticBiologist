var express = require("express");
var app= express();
var path=require('path');
var bodyParser= require('body-parser');
var csvtoarray=require('csv-to-array');

var Root_Folder= "RealWork/TestData_Date";
const convertFolder= './RealWork/TestData_Date/20160615/20160615-01_Converted/';
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


var DashBoard_Directory = findFilesInDir(Root_Folder,'Name.json');
console.log(DashBoard_Directory);

//var Hello=__dirname + "/RealWork/TestData_Date/20160615/20160615-01_Converted/A1.json"
//var Check =fs.lstatSync(Hello);
//console.log(Check.isDirectory());
//console.log(fs.statSync(Hello));

app.use(express.static(__dirname + '/views'));

app.set('view engine','ejs');

app.get("/GetServer",function(request,response){
  
    var stat = fs.lstatSync(Directory_Return);
    console.log(stat.isFile());
    if(stat.isFile()){
    
                console.log("itsatext");
                console.log(Directory_Return);
                
                response.send({File: "Yup"});
                response.end();
            
                       }     
                

    else{
         
     var Inside_Root2= fs.readdirSync(Directory_Return);
         response.send({RootFolder: Root_Folder,
                   Directory: Directory_Return,
                  Inside_Root: Inside_Root2});
    }
   
  
    console.log("Request Received!");

    
});

app.get("/File_Display/:id" , function(request,response){
    console.log("Incoming:"+ request.url);
    console.log(request.params.id);
    var File_Name= request.params.id;
    if(File_Name.includes(".txt")){
        console.log("TEXT");
        Inside_Root_File=fs.readFileSync(Directory_Return).toString();
    }
    else if(File_Name.includes(".csv")) {
         console.log("CSV");
        Inside_Root_File=fs.readFileSync(Directory_Return).toString();
    }
    else {
        console.log("JSON");
          Inside_Root_File=JSON.parse(fs.readFileSync(Directory_Return).toString());
    }
    Directory_Return = Root_Folder;
    console.log(Directory_Return);
    response.send(Inside_Root_File);
        });



app.post("/test",urlencodedParser,function(request,response){
    Directory_Return="";
    Directory_Return = request.body.directory_return;
    console.log(Directory_Return);
   console.log("Request Posted!");
 
});
// Need to change this afterwards, folder is not dynamic
/*
app.get("/JSONRequest/:id",function(request,response){
   console.log("Client Request for" + request.params.id);
    
    ContentsTest=fs.readFileSync(__dirname + "/" + convertFolder + "/" + request.params.id + ".json" );
    JSON_ContentsTest=JSON.parse(ContentsTest);
    response.send(JSON_ContentsTest);
    /*response.send(__dirname + "\RealWork\TestData_Date\20160615\20160615-01_Converted\A1.json");*/
    
// S});


app.get("/DashBoard/:id",function(request,response){
   console.log("Client Request From Dash Board For" + request.params.id);
    var DashBoard_Directory2= findFilesInDir(Root_Folder,'Name.json');
    console.log(DashBoard_Directory);
    for (var t=0;t<DashBoard_Directory2.length;t++){ 
        var Store =DashBoard_Directory[t] ;
        console.log(Store);
        DashBoard_Directory2[t]=DashBoard_Directory2[t].replace("\\" + Store + "\\Name.json",'');
        
    }
    console.log(DashBoard_Directory2);
    
    for  (var t=0;t<DashBoard_Directory2.length;t++){ 
        Store=DashBoard_Directory2[t]+"/"+request.params.id;
        console.log(Store);
                           console.log(fs.existsSync(Store));
        
    if(fs.existsSync(Store)){
        
         ContentDashBoard=fs.readFileSync(__dirname+ "/" +DashBoard_Directory2[t]+"/"+request.params.id+"/Name.json");
            console.log(ContentDashBoard);
            JSON_ContentDashBoard= JSON.parse(ContentDashBoard);
            response.send(JSON_ContentDashBoard);
        
                }
        
    }

    
    
});

app.get("/DashBoardInit",function(request,response){
    console.log("Client Request To Initialise DashBoard");
    DashBoard_Directory = findFilesInDir(Root_Folder,'Name.json');
   console.log(DashBoard_Directory);
    
    for (var t=0;t<DashBoard_Directory.length;t++){
     DashBoard_Directory[t]=DashBoard_Directory[t].split("\\");
    }
    
    for (var j=0;j<DashBoard_Directory.length;j++){
        DashBoard_Directory[j]=DashBoard_Directory[j][DashBoard_Directory.length-2];
        
    }
       console.log(DashBoard_Directory);
    response.send(DashBoard_Directory);

    
});
/*
app.get("/testservefsafsr/:id",function(request,response){
    Contents= request.params.id;
    console.log(Contents);

});
*/


app.listen(3000,"127.0.0.1",() => {
    console.log(`Server is listerning on localhost port 3000`);
});

