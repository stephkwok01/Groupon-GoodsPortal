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

//home page controller
app.controller("homeCtrl", function($scope,$location,$http,$window){


});

//portal page controller
app.controller("portalCtrl", function($scope,$location,$http,$window){
	$http({
		method: "GET",
		url: 'https://private-anon-c529c0f64-parcelninja.apiary-mock.com/api/v1/tracking/WIA1340707',
		headers :{
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': '6aed16cf-f549-43d1-9f16-07056ea8b1a3',	
		}
	}).then(function(response){
		console.log(response);
	})

});