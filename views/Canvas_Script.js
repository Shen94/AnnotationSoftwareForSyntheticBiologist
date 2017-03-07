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
     
     
$(document).ready(function() {
       
    var dataPointss2 = [];
      var dataPointss3 = [];
        var dataName=[];
    var PointsStore=[];
    var Annotate= ["A1","A2","A3"];
     var SamplePoints = {
         [Annotate[0]]:[],
         [Annotate[1]]:[],
           [Annotate[2]]:[]
     };

//Plotting Samples Data
     var chart = new CanvasJS.Chart("chartContainer",
            {
            animationEnabled: true,
                    title: {
                        text:""
                    },
         
         axisX: {
			interval: 30,
            title: "Time(Min)",
            titleFontSize: 14,
            labelFontSize: 14,
		},
         
        axisY:
        {
            title: "Arbitary Unit",
          interval: 0.05,  
            labelFontSize:14,
            titleFontSize: 14,
            
        },
        legend:
        {
            horizontalAlign:"right",
            verticalAlign: "center",
            cursor: "pointer",
            itemclick: function (e) {
                //console.log("legend click: " + e.dataPointIndex);
                //console.log(e);
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
 
                e.chart.render();
            }
        },
                    data: [
                    {
                        type: "spline",
                        showInLegend: true
                    //    name:[],
                    //   dataPoints: []
                    },
                       
                   {
                        type: "spline",
                        showInLegend: true
                       // name:[],
                     //  dataPoints: []

                    },
                        
                    {
                       type: "spline",
                        showInLegend: true
                    //    name:[],
                    //   dataPoints: []
              
                   }
                    
                    
                    
                    ]
                      });
        
    
    
for(var i=0;i<Annotate.length; i ++ ){
    data=GetRequestSync("/JSONRequest/" + Annotate[i]);
    dataName=data.Location;
    Data_Content= data.Content;
    console.log(dataName);
    for (var j = 0; j < data.Time.length; j++) {
    SamplePoints[Annotate[i]].push({ x: parseFloat(data.Time[j]), y: parseFloat(data.Absorbance[j]) });
    //   dataPointss.push({ x: parseFloat(data.Time[j]), y: parseFloat(data.Absorbance[j]) });
    };
        chart.options.data[i].dataPoints= SamplePoints[Annotate[i]];
            chart.options.data[i].name= dataName;
    
            chart.options.title.text=Data_Content;
        };
      chart.render();

});