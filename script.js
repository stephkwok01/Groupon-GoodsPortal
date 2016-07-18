var app = angular.module("GrouponTrackApp", ["ngRoute"]);

//config
app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "./templates/home.html"
	})
  //portal page
  $routeProvider.when("/portal",{
  	templateUrl: "./templates/portal.html"
  })
}); //end of config

var trackStatus = {};
//home page controller
app.controller("homeCtrl", function($scope,$location,$http,$window){

var URL = "http://stormy-reaches-65962.herokuapp.com/?url=https://www.parcelninja.co.za/api/v1/tracking/";
 $scope.trackOrder = function(string) {
 	var finalUrl = URL + $scope.waybill;
 	console.log($scope.waybill);
	console.log(finalUrl);
 	$http({
		method: "GET",
		url: finalUrl,
		hearders :{
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'username': '0d4b1c4d-6dd0-4a75-9a0a-46e54be70b76',
		'Authorization': 'Basic 6aed16cf-f549-43d1-9f16-07056ea8b1a3',	
		'Access-Control-Allow-Origin': '*',
		}

	}).then(function(response){
		trackStatus = response.data; 
		// console.log(response.data.contactNo);
		if (trackStatus!== null && trackStatus.trackingNo === $scope.waybill) {
			console.log(response.data);
			$location.path("/portal");
		}
		else {
		// 	$scope.user.mobile="";
			$scope.waybill="";
		}
	});
 }
});


//portal page controller
app.controller("portalCtrl", function($scope,$location,$http,$window){
	$scope.orderImage = true;
	$scope.processImage = true;
	$scope.prepImage = true;
	$scope.transitImage = true;
	$scope.outImage = true;
	$scope.deliverImage = true;
	$scope.dateEst = "";

	//sorting estimated delivery date
	var year = trackStatus.estDeliveryEndDate.slice(0,4);
  var month = trackStatus.estDeliveryEndDate.slice(4,6);
  var day = trackStatus.estDeliveryEndDate.slice(6,8);

  //hovering effect 
  $scope.hover = function() {
  	$scope.orderedText = true;
  }
  $scope.hoverOver = function(){
  	$scope.orderedText = false;
  }

  $scope.processHover = function(){
  	$scope.processText = true;
  }
  $scope.processHoverOver = function(){
  	$scope.processText = false;
  }

  $scope.prepHover = function(){
  	$scope.prepText = true;
  }
  $scope.prepHoverOver = function(){
  	$scope.prepText = false;
  }

  $scope.transitHover = function(){
  	$scope.transitText = true;
  }
  $scope.transitHoverOver = function(){
  	$scope.transitText = false;
  }

  $scope.outHover = function(){
  	$scope.outText = true;
  }
  $scope.outHoverOver = function(){
  	$scope.outText = false;
  }

  $scope.delHover = function(){
  	$scope.deliverText= true;
  }
  $scope.delHoverOver = function(){
  	$scope.deliverText = false;
  }

	//package ordered 
	if(trackStatus.status.description === "ordered") {
		$scope.firstStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
    $scope.dateEst = day + "/" + month + "/" + year;
		$scope.orderImage = false;
	}
	//package processing
	else if(trackStatus.status.description === "Waybill Imported") {//change the description later
		$scope.secondStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
    $scope.dateEst = day + "/" + month + "/" + year;
		$scope.processImage = false;
	}
	//packing preparing to ship
	else if(trackStatus.status.description === "On Manifest") {
		$scope.thirdStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
    $scope.dateEst = day + "/" + month + "/" + year;
		$scope.prepImage = false;
	}
	//package in transit
	else if(trackStatus.status.description === "Off Manifest" || trackStatus.status.description === "Shipment Has Been Dispatched"){
		$scope.fourthStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
    $scope.dateEst = day + "/" + month + "/" + year;
		$scope.transitImage = false;
	}

	//package out for delivery
	else if(trackStatus.status.description === "On Trip"){ //change later
		$scope.sixthStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
    $scope.dateEst = day + "/" + month + "/" + year;
		$scope.outImage = false;
	}

	//package delivered 
	else if(trackStatus.status.description === "Pod Received" || trackStatus.status.description === "Delivered"){ 
		$scope.fifthStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.dateEst = "Pacakge delivered" //change to delivered date
		$scope.deliverImage = false;
	}
	else {
		$scope.thirdStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.prepImage = false;
	}
});






