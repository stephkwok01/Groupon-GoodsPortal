var app = angular.module("GrouponTrackApp", ["ngRoute"]);

//config
app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "home.html"
	})
  //portal page
  $routeProvider.when("/portal",{
  	templateUrl: "portal.html"
  })
}); //end of config

var trackStatus = {};
//home page controller
app.controller("homeCtrl", function($scope,$location,$http,$window){

var URL = "https://private-anon-c529c0f64-parcelninja.apiary-mock.com/api/v1/tracking/";
var finalUrl = URL + $scope.waybill;
 $scope.trackOrder = function(string) {
 	$http({
		method: "GET",
		url: finalUrl,
		headers :{
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': 'Basic 6aed16cf-f549-43d1-9f16-07056ea8b1a3',	
		}
	}).then(function(response){
		trackStatus = response.data;
		if (trackStatus!== null) {
		$location.path("/portal");
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
	$scope.deliverImage = true;
	$scope.dateEst = "";

	//package ordered 
	if(trackStatus.status.description === "Odered") {//change the description later
		$scope.firstStyle = {
			"background-color" : "#48A431",
			"height" : "90px",
			"width" : "90px"
		}
		$scope.dateEst = trackStatus.estDeliveryEndDate;
		$scope.orderImage = false;
	}
	//package processing
	if(trackStatus.status.description === "Processing") {//change the description later
		$scope.secondStyle = {
			"background-color" : "#48A431",
			"height" : "90px",
			"width" : "90px"
		}
		$scope.dateEst = trackStatus.estDeliveryEndDate;
		$scope.processImage = false;
	}
	//packing preparing to ship
	if(trackStatus.status.description === "Preparing to ship") {//change the description later
		$scope.thirdStyle = {
			"background-color" : "#48A431",
			"height" : "90px",
			"width" : "90px"
		}
		$scope.dateEst = trackStatus.estDeliveryEndDate;
		$scope.prepImage = false;
	}
	//package in transit
	if(trackStatus.status.description === "Onboard - the parcel is onboard the Courier vehicle."){
		$scope.fourthStyle = {
			"background-color" : "#48A431",
			"height" : "90px",
			"width" : "90px"
		}
		$scope.dateEst = trackStatus.estDeliveryEndDate;
		$scope.transitImage = false;
	}
	//package delivered 
	if(trackStatus.status.description === "delivered."){ //change later
		$scope.fifthStyle = {
			"background-color" : "#48A431",
			"height" : "90px",
			"width" : "90px"
		}
		$scope.dateEst = "Pacakge delivered" //change to delivered date
		$scope.deliverImage = false;
	}
});






