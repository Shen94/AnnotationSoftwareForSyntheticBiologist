var express = require("express");
var app= express();
var readline=require('readline');
var path=require('path');

/*Base on the folder root of express-server.js */
const testFolder = './RealWork/TestData_Date'; //Root Folder
const convertFolder= './RealWork/TestData__Date_Converted'
const fs = require('fs');
var Filequeue = require('filequeue');
var fq = new Filequeue(200);
var prompt= require('prompt');

function getFileWithExtensionName(dir, ext) {
  fs.readdirSync(dir, function(files){
    for (var i = 0; i < files.length; i++) {
      if (path.extname(files[i]) === '.' + ext)
        return files[i]
    }
  });
}

function CSVToJSON(content_split,Directory,filename){
     var j=0;
var Well_Name=[''];
var content_split2=[''];
var json_content=[''];
var n=0;
var t=0;
var content_split= contents2.split("\n");
for (c=0;c<content_split.length;c++)
{
    content_split2[c]=content_split[c].split(",");
}
    var contents=fs.readFileSync(__dirname + "/" + Directory + "/" + filename).toString() ;

        Start_Line= lineOf(contents,"A1");
        End_Line=lineOf(contents,"H12");
                 
            for (var i= Start_Line ; i<=End_Line ;i++){
                
             var File_Init=getLine(contents,i);
                    Well_Name[j]=File_Init[0];
                j++;
                }
                
            
for (g=1;g<9;g++){
   
  for(n=1;n<13;n++)
      {
              json_content[t]= ['"' + Well_Name[t] +'"' +":"+'"'+ content_split2[g][n]+'"'] ;
                t++;
      }
   
           
}

    console.log(json_content);
return json_content;
}
(function() {
  // Regular expression to separate the digit string from the non-digit strings.
  var reParts = /\d+|\D+/g;
 
  // Regular expression to test if the string has a digit.
  var reDigit = /\d/;
 
  // Add cmpStringsWithNumbers to the global namespace.  This function takes to
  // strings and compares them, returning -1 if `a` comes before `b`, 0 if `a`
  // and `b` are equal, and 1 if `a` comes after `b`.
  cmpStringsWithNumbers = function(a, b) {
      var reParts = /\d+|\D+/g;
 
  // Regular expression to test if the string has a digit.
  var reDigit = /\d/;
    // Get rid of casing issues.
    a = a.toUpperCase();
    b = b.toUpperCase();
 
    // Separates the strings into substrings that have only digits and those
    // that have no digits.
    var aParts = a.match(reParts);
    var bParts = b.match(reParts);
 
    // Used to determine if aPart and bPart are digits.
    var isDigitPart;
 
    // If `a` and `b` are strings with substring parts that match...
    if(aParts && bParts &&
        (isDigitPart = reDigit.test(aParts[0])) == reDigit.test(bParts[0])) {
      // Loop through each substring part to compare the overall strings.
      var len = Math.min(aParts.length, bParts.length);
      for(var i = 0; i < len; i++) {
        var aPart = aParts[i];
        var bPart = bParts[i];
 
        // If comparing digits, convert them to numbers (assuming base 10).
        if(isDigitPart) {
          aPart = parseInt(aPart, 10);
          bPart = parseInt(bPart, 10);
        }
 
        // If the substrings aren't equal, return either -1 or 1.
        if(aPart != bPart) {
          return aPart < bPart ? -1 : 1;
        }
 
        // Toggle the value of isDigitPart since the parts will alternate.
        isDigitPart = !isDigitPart;
      }
    }
 
    // Use normal comparison.
    return (a >= b) - (a <= b);
  };
})();      
     
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

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}
 
function lineOf(text, substring){
  var line = 0, matchedChars = 0;

  for (var i = 0; i < text.length; i++) {
    text[i] === substring[matchedChars] ? matchedChars++ : matchedChars = 0;

    if (matchedChars === substring.length){
        return line;                  
    }
    if (text[i] === '\n'){
        line++;
    }
  }

  return  -1;
}

function getLine(data,Line){
        var Data_Split=data.split("\n");
        var x1=Data_Split[Line].split(";");
    x1[2]=x1[2].replace(/(\r\n|\n|\r)/gm,"");
        return x1;
            
        }

app.use(express.static("RealWork"));

app.get("/index.html",function(request,response) {
    console.log(`Incoming request: ${request.url}`)
   response.sendFile(__dirname+'/RealWork/index.html')
});

app.get("/index2.html",function(request,response) {
    console.log(`Incoming request: ${request.url}`)
   response.sendFile(__dirname+'/RealWork/index2.html')
});

app.listen(3000,"127.0.0.1",() => {
    console.log(`Server is listerning on localhost port 3000`);
});

/* Data Processing */
 prompt.start();
    console.log("Do you want to process the data?(Y/N) Root Folder=" +testFolder  );
  prompt.get(['Input'], function (err, result) {
    if (err) { return onErr(err); }
            console.log('Command-line input received:',result.Input);
      var Input= result.Input;

if (Input.localeCompare("Y")===0){
var time=[0];
var y=0;
var z=0;
var g=0;
var AReadings=[0];
var filesTemp=[''];
var CSV_Files=[''];
var FReadings=[0];
var Directory_Converted=[''];

 Directory = findFilesInDir(testFolder,'AssayPlate_1.txt');

console.log("Processing...");

        
     
for (var t = 0;  t < Directory.length; t++) {
    
        var y=0;
     
     
     Directory[t]=Directory[t].replace("\\AssayPlate_1.txt",'');

     
     
      Directory_Converted[t]=Directory[t]+'_Converted';
      fq.mkdir(Directory_Converted[t],function(err){
         
        });
     
   files= fs.readdirSync(Directory[t],'utf8');
     var j=0;
     for(var i in files){
         if(path.extname(files[i])=== ".csv"){
            CSV_Files = files[i];

            }
     }
     for(var i in files) {
   if(path.extname(files[i]) === ".txt") {
       filesTemp[j]=files[i];
       j++;
   }
}
   console.log(filesTemp);
    filesTemp.forEach(file=>{
                    time[y+1]= time[y]+15;
                    y++;
                    });
  
     file_sort= filesTemp.sort(cmpStringsWithNumbers);
     
    
    console.log(__dirname + "/" + Directory[t] + "/" + CSV_Files);
     contents2=fs.readFileSync(__dirname + "/" + Directory[t] + "/" + CSV_Files).toString() ;
    console.log(contents2);
     var content_split= contents2.split("\n");
    var JSON_Content = CSVToJSON(content_split,Directory[t],file_sort[1]);
          fs.writeFileSync(__dirname + "/" + Directory[t] + "/" + "Name.json","{"+JSON_Content+"}",function(err){
         
     });
    console.log("checkpoint1");

      var time_new=time.map(function(p){return '"' + p + '"';}).join(',');
    
    console.log("checkpoint2");
         
 for (var l = 0; l < file_sort.length; l++) {

        var contents=fs.readFileSync(__dirname + "/" + Directory[t] + "/" + file_sort[l]).toString() ;
        Start_Line= lineOf(contents,"A1");
        End_Line=lineOf(contents,"H12");
        contents2=fs.readFileSync(__dirname + "/" + Directory[t] + "/Name.json") ;
        var json_content = JSON.parse(contents2);
     
            for (var i= Start_Line ; i<=End_Line ;i++){
             var File_Init=getLine(contents,i);
                
                fs.writeFileSync(__dirname + "/" + Directory_Converted[t] + "/" + File_Init[0] + '.json', '{"'+ "Content"+ '":"' + json_content[File_Init[0]]+'",' , function (err) {
                  
                    if (err) return console.log(err);
                            });
                
                fs.appendFileSync(__dirname + "/" + Directory_Converted[t] + "/" + File_Init[0] + '.json', '"Location": "' + File_Init[0] + '",',function (err) {
                  
                    if (err) return console.log(err);
                            });
                
                fs.appendFileSync(__dirname + "/" + Directory_Converted[t] + "/" + File_Init[0] + '.json', '"Time":[' + time_new + "],", function (err) {
                  
                    if (err) return console.log(err);
                            });
              z=0;
             

        
            for (var j = 0; j < file_sort.length; j++) {

             

             
                    var contents=fs.readFileSync(__dirname + "/" + Directory[t] + "/" + file_sort[j]).toString();
                    

                  File_Init2=getLine(contents,i);
               
              FReadings[z+1]=File_Init2[1];
              AReadings[z+1]=File_Init2[2];
              
                 z++;
                  
        
            
            };
            
                FReadings2=FReadings.map(function(p){return '"' + p + '"'; }).join(',');
                AReadings2=AReadings.map(function(p){return '"' + p + '"'; }).join(',');
                
             
              
                
      fs.appendFileSync(__dirname + "/" + Directory_Converted[t] + "/" + File_Init[0] + '.json', '"Fluorescence":['+FReadings2 + "],", function (err) {
      
       
            
              if (err) return console.log(err);
        });
        
        
          
        fs.appendFileSync(__dirname + "/" + Directory_Converted[t] + "/" + File_Init[0] + '.json', '"Absorbance":['+AReadings2 +"]}", function (err) {
            
            
              if (err) return console.log(err);
        });

                    
            };
   
     
     };
     
     
     
 };
console.log("Processing Done");
}
else {
    
    console.log("No Processing");
}


            });    

/* Converting to JSON file */

