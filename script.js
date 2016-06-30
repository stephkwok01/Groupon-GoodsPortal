var app = angular.model("GrouponTrackApp", ["ngRoute"]);

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
	

});