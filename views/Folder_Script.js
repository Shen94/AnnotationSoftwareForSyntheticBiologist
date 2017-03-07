var x=[];
function Reload() {
try {
var headElement = document.getElementsByTagName("head")[0];
if (headElement && headElement.innerHTML)
headElement.innerHTML += "<meta http-equiv=\"refresh\" content=\"1\">";
}
catch (e) {}
}
function GetRequestSync(URLH){
            
        var jhr= new XMLHttpRequest();
        
        jhr.onreadystatechange = function() {
    if (jhr.readyState === XMLHttpRequest.DONE) {
        
         x=jQuery.parseJSON(jhr.responseText);
    
        }
        };
        
            jhr.open("GET",URLH,false);
          jhr.send()
             /* default to null */
           return x;
           
       };
 function GetRequestASync(URL){
            var x=[];
        var jhr= new XMLHttpRequest();
        
        jhr.onreadystatechange = function() {
    if (jhr.readyState === XMLHttpRequest.DONE) {
        
         x=jQuery.parseJSON(jhr.responseText);
        }
        }
            jhr.open("GET",URL,true);
            jhr.send(null); /* default to null */
           return x;
           
       };
function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

$(document).ready(function(){
    
        var Cookies_Root = getCookie("Root");
    console.log(document.cookie);
    console.log(Cookies_Root);
if(Cookies_Root=='undefined' || Cookies_Root==null){
            console.log("Hello");
            console.log(Cookies_Root);
                  console.log(document.cookie);
        x= GetRequestSync("/GetServer");
        var s='<a class="list-group-item" id="RootFolder" name="FirstDirectory">' + x.RootFolder +'</a>';
        var foo =document.createElement('foo');
        foo.innerHTML= s;
        $('div.list-group').append(foo.innerHTML);
        temp = x.Inside_Root;
            temp_root= x.RootFolder;
            temp_directory=x.Directory;
        document.cookie="Root="+ x.RootFolder+ ";path=/;";
        }
        
     else {
        
         console.log(Cookies_Root);
         var s='<a class="list-group-item" id="RootFolder" name="FirstDirectory">' + Cookies_Root +'</a>';
        var foo =document.createElement('foo');
        foo.innerHTML= s;
        $('div.list-group').append(foo.innerHTML);
        temp_root= Cookies_Root;
     }
      
$("#RootFolder").click(function()
{
              $.post("/test",{
                  directory_return : temp_root
              })
            
            var x=GetRequestSync("/GetServer");
            temp = x.Inside_Root;
            temp_root= x.RootFolder;
            temp_directory=x.Directory;
            
           
                $(this).remove();
     /*      $(this).after('<div class="list-group">');*/
               $("ol.breadcrumb").append('<li class="breadcrumb-item"><a>'+x.RootFolder+'</a></li>');
            for (i=0;i<temp.length;i++){
                                
                $("div.list-group").append('<a class="RootFolderTest list-group-item">'  + temp[i] + "</a>");
                       

            }
        
        /*    $(this).after("</div>");*/
          
            
            
});
     
    
        
        $(document).on('click',"a.RootFolderTest",function(){
             
            var x=GetRequestSync("/GetServer");
            temp = x.Inside_Root;
            temp_root= x.RootFolder;
            temp_directory=x.Directory;
            var X_Return=$(this).html();
        
            $("ol.breadcrumb").append('<li class="breadcrumb-item"><a>'+$(this).html()+'</a></li>');
            
            $("a.RootFolderTest").remove();
            
    
            $.post("/test",{
            directory_return : temp_directory + "/" + X_Return
            
            })
            
           var x=GetRequestSync("/GetServer");
    
            if (x.File!= null){
                var Directory_Name = temp_directory + "/" + X_Return;
                Directory_Name = Directory_Name.replace(/\//g, " ");
                
                window.location.href= "/File_Display/" + Directory_Name;
            
            }
            else {
                
            temp= x.Inside_Root;
           temp_directory=x.Directory;
                
               for (i=0;i<temp.length;i++){
                                
                $("div.list-group").append('<a class="RootFolderTest list-group-item">'  + temp[i] + "</a>");                     
            }
                
            }
           
            
        });
     
    $(document).on('click',"li.breadcrumb-item",function(){
         var x=GetRequestSync("/GetServer");
            temp = x.Inside_Root;
            temp_root= x.RootFolder;
            temp_directory=x.Directory;
        var Now=($(this).children().html());
        $(this).nextAll().remove();
        
       
        if (Now === temp_root)
            {
                 $.post("/test",{
            directory_return : Now  
            
                 });
            }
            else{
            var Directory_Store="";
         $($(this).prevAll("li.breadcrumb-item").get().reverse()).each(function(){
                                         
                                           
                                            Directory_Store= Directory_Store + "/"+  $(this).children().html();            
                                        
                                         }) 
var Directory_Store=Directory_Store.substr(1);
               
                   
                    $.post("/test",{
                        
                        directory_return: Directory_Store + "/" +  Now
                    });
            }
            
            var x=GetRequestSync("/GetServer");
            temp= x.Inside_Root;
           $("a.RootFolderTest").remove();
        for (i=0;i<temp.length;i++){
                                
                $("div.list-group").append('<a class="RootFolderTest list-group-item">'  + temp[i] + "</a>");                     
        }
 
       
     
        
        
     });
     
      
            
            
         
        /*
var x=GetRequest("/testserver",null);
             temp_directory=x.Directory;
            var X_Return=$(this).html();
            console.log(temp_directory);
            $("li.breadcrumb-item a").nextAll().remove();
            $("a.RootFolderTest").hide();
            
            $.post("/test",{
                directory_return : temp_directory + "/" + X_Return
            })
               */    
            
        
        /* To refresh */
    $("ol.breadcrumb li.active a").click(function(){
            
    
        /*
           temp_root= x.RootFolder;
         
           $.post("/test",{
        directory_return : temp_root
           })        
           */
                window.location.reload(true); 
              

        

       });
            
    
        
       $("ul.nav.navbar-nav.navbar-right").click(function(){
        
                  window.location.reload(true); 

       });

            // do anything that needs to be done on document.ready
            // don't really need this dom ready thing if used in footer
        
    });
            