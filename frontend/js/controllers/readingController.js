module.exports = function(app) {
    app.controller('readingController',['$scope','$http',function($scope,$http) {
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
	}]);
}



		    