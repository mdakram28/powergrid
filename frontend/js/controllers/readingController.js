// var plotly = require('plotly')();

var $script = require("scriptjs");
var plotly;
var moment = require('moment');

$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
    
});
    



$script("https://cdn.plot.ly/plotly-latest.min.js", function() {
	console.log("Plotly");

		var TESTER = document.getElementById('tester');
	/*Plotly.plot( TESTER, [{
	x: [1, 2, 3, 4, 5],
	y: [1, 2, 4, 8, 16] }], {
	margin: { t: 0 } } );
	plotly = Plotly;*/
	Plotly.d3.json('http://localhost:8080/api/readings/getPerDayPower?start="Mar 01 2016 00:00:00 GMT+0530 (India Standard Time)"&end="Wed Mar 01 2016 24:00:00 GMT+0530 (India Standard Time)"', function(rows){
		  var trace = {
		        type: "scatter",                    // set the chart type
		        mode: 'lines',                      // connect points with lines
		        x: rows.map(function(row){          // set the x-data
		          return row['datetime'];
		        }),
		        y: rows.map(function(row){          // set the x-data
		          return row['kw'];
		        }),
		        line: {                             // set the width of the line.
		          width: 1
		        },
		        error_y: {
		          array: rows.map(function(row){    // set the height of the error bars
		            return row['kw'];
		          }),
		          thickness: 0.5,                   // set the thickness of the error bars
		          width: 0
		        }
		      };

		      var layout = {
		        yaxis: {title: "kw"},       // set the y axis title
		        xaxis: {
		          showgrid: false,                  // remove the x-axis grid lines
		          tickformat: ""//"%H~%M~%S.%2f"             // customize the date format to "month, day"
		        },
		        margin: {                           // update the left, bottom, right, top margin
		          l: 40, b: 50, r: 10, t: 20
		        }
		      };

		      Plotly.plot(document.getElementById('tester'), [trace], layout, {showLink: false});
		});
});
module.exports = function(app) {
    app.controller('readingController',['$scope','$http',function($scope,$http) {
 //    console.log("Plotly initializing")
	// console.log(Plotly);


		

		$scope.sendDate = function() { 
			// body...
			if(!($scope.start)==true || !($scope.end)==true){
				var curr = new Date();
				var start = new Date(curr.getTime() - (24*3600000));
				
				var end = new Date(curr.getTime() + (24*3600000));
				
			}
			else{
				var start = $scope.start;
				var end = new Date($scope.end.getTime() + (24*3600000));
				}
			
			var type = $scope.type;
			if(!type == true){
				alert("Please select a valid Type");
			}

			var url = 'http://localhost:8080/api/readings/getData';
						
			var reqData ={"data":{"from":start,"to":end,"type":type,"table":"test"}};
	
			var req = {
            method: 'POST',
            url: url,
           	data : reqData,
            headers: {
               'Content-Type': 'application/json'
                }
             
            }
			$http(req).then(function successCallback(response) {
			        console.log(response.data);
			        var data = response.data;
			        var type = $scope.type;
			        var item1 = "";
			        var item2 = "";
			        var item3 = "";
		    		if(type=="VRY"){
						 item1 = 'vry';
						 item2 = 'vyb';
						 item3 = 'vbr';
					}
					if(type=="VRN"){
						 item1 = "vrn";
						 item2 = "vyn";
						 item3 = "vbn";
					}
					if(type=="IR"){
						 item1 = 'ir';
						 item2 = 'iy';
						 item3 = 'ib';
					}
					if(type=="KVAR"){
						 item1 = "kva-r";
						 item2 = "kva-y";
						 item3 = "kva-b";
					}
					if(type=="KVARR"){
						 item1 = "kvar-r";
						 item2 = "kvar-y";
						 item3 = "kvar-b";
					}
					if(type=="WR"){
						 item1 = "kw-r";
						 item2 = "kw-y";
						 item3 = "kw-b";
					}

					if(data.length!=0){
						var labelStart = data[0].datetime;
						var labelEnd = data[data.length-1].datetime;
					}
					else{
						alert("Oops!! No value to display!! \n Choose another Date!!");
					}
					var dateTime=[];
					var VRY=[];
					var VYB = [];
					var VBR = [];
					
					for (var i in data){
						console.log(item1+item2+item3);
						dateTime.push(data[i]["datetime"]);
						VRY.push(data[i][item1]);
						VYB.push(data[i][item2]);
						VBR.push(data[i][item3]);
					}
					var chartdata = {
						labels: dateTime,
						datasets : [
						{
							label: 'datetime '+item1,
							fill: true,
							backgroundColor : 'rgba(255, 0, 0, 0.20)',
							borderColor : 'rgba(255, 0,0, 0.75)',
							hoverBackgroundColor: 'rgba(255, 0, 0, 0.55)',
							hoverBorderColor : 'rgba(200,200,200,1)',
							data: VRY
						},
						{
							label:'datetime '+item2,
							fill: true,
							backgroundColor:'rgba(255, 255,0, 0.20)',
							borderColor: 'rgba(255, 255,0, 0.50)',
							hoverBackgroundColor: 'rgba(255, 255,0, 0.50)',
							hoverBorderColor : 'rgba(200,200,200,1)',
							data: VYB
						},
						{
							label:'datetime '+item3,
							fill: true,
							backgroundColor:'rgba(0, 0, 255, 0.20)',
							borderColor: 'rgba(0, 0, 255, 0.75)',
							hoverBackgroundColor: 'rgba(0, 0, 255, 0.75)',
							hoverBorderColor : 'rgba(200,200,200,1)',
							data: VBR
						},
						]

					};
					var ctx = $("#mycanvas");
					
					var barGraph = new Chart(ctx,{
						type : 'line',
						data: chartdata,
						 
						options: {
							responsive: true,
							scales: {
								xAxes : [{
									display: true
								}]
							},
							title: {
		           			display: true,
		        		    text: labelStart+'  to  '+labelEnd
		        				},
		        			
							scales: {
		            			yAxes: [{
					                ticks: {
					                    beginAtZero:false
					                }
					            }]
					        }
							}
					});
					if(barGraph !== undefined || barGraph !== null){
		             		barGraph.destroy();
						}


			          
			         }, function errorCallback(response) {
			           console.log("error: "+response);
			        });
		}
		$scope.getDay = function () {
			var url = "http://localhost:8080/api/readings/getPerDayPower";
			
			if(!($scope.start)==true || !($scope.end)==true){
				var curr = new Date();
				var start = new Date(curr.getTime() - (24*3600000));
				
				var end = new Date(curr.getTime() + (24*3600000));
				
			}
			else{
				var start = $scope.start;
				var end = new Date($scope.end.getTime() + (24*3600000));
				}

			var reqData ={"data":{"from":start,"to":end,"table":"test"}};
			var req = {
			    method: 'POST',
			    url: url,
			    data : reqData,
			    headers: {
			               'Content-Type': 'application/json'
			                }
			             
			}
			$http(req).then(function successCallback(response) {
			        console.log(response.data);
			        var data = response.data;
			 
		  
					var dateTime=[];
					var kw=[];
					for (var i in data){
						dateTime.push(data[i]["datetime"]);
						kw.push(data[i]["kw"]);
					}
					var chartdata = {
						labels: dateTime,
						datasets : [
						{
							label: 'datetime '+'kw',
							fill: true,
							backgroundColor : 'rgba(255, 0, 0, 0.20)',
							borderColor : 'rgba(255, 0,0, 0.75)',
							hoverBackgroundColor: 'rgba(255, 0, 0, 0.55)',
							hoverBorderColor : 'rgba(200,200,200,1)',
							data: kw
						}
						]

					};
					if(data.length!=0){
						var labelStart = data[0].datetime;
						var labelEnd = data[data.length-1].datetime;
					}
					var ctx = $("#mycanvas");
					
					var barGraph = new Chart(ctx,{
						type : 'line',
						data: chartdata,
						 
						options: {
							responsive: true,
							scales: {
								xAxes : [{
									display: true
								}]
							},
							title: {
		           			display: true,
		        		    text: labelStart+'  to  '+labelEnd
		        				},
		        			
							scales: {
		            			yAxes: [{
					                ticks: {
					                    beginAtZero:false
					                }
					            }]
					        }
							}
					});
					if(barGraph !== undefined || barGraph !== null){
		             		barGraph.destroy();
						}


			          
			         }, function errorCallback(response) {
			           console.log("error: "+response);
			        });
			
		}
	}]);
}



		    