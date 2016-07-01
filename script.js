var app = angular.module("GrouponTrackApp", ["ngRoute"]);

//config
app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/home.html"
	})
  //portal page
  $routeProvider.when("/portal",{
  	templateUrl: "templates/portal.html"
  })
}); //end of config

var trackStatus = {};
console.log(trackStatus);
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
		console.log(trackStatus);
		if (trackStatus!== null) {
		$location.path("/portal");
	}
	});
	

 }

});


//portal page controller
app.controller("portalCtrl", function($scope,$location,$http,$window){
	console.log(trackStatus);
});