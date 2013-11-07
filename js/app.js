var smApp = angular.module('smApp',['ui.bootstrap','ui.router','infinite-scroll']);

smApp.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: 'appController',
    })
    .state('404', {
      url: "/404",
      templateUrl: "404.html",
      controller: 'app404Controller',
    })
    // For any unmatched url, redirect to /state1
     $urlRouterProvider.otherwise("/404");

});
// Reddit constructor function to encapsulate HTTP and pagination logic
smApp.factory('smAppSession', function($http) {
/*  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    $http.jsonp(url).success(function(data) {
      var items = data.data.children;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i].data);
      }
      this.after = "t3_" + this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this));
  };

  return Reddit;
*/
  return {
        updateDetails: function(url) {
          return $http.jsonp(url);
        }
      }
});
//controller
smApp.controller('appController', function($scope,smAppSession){

	$scope.alerts = [];
	$scope.searchText;
	$scope.reddit;
  $scope.items = [];
  $scope.busy = false;
  $scope.after = '';

  $scope.getUpdate = function(){
    if ($scope.busy) return;
    $scope.busy = true;
    var url = "http://api.reddit.com/hot?after=" + $scope.after + "&jsonp=JSON_CALLBACK";
    smAppSession.updateDetails(url).success($scope.updateContent).error($scope.displayError);
  };
  $scope.displayError = function(data, status){
        console.log("Error");
    };
  $scope.updateContent =  function(data, status){
    var items = data.data.children;
    for (var i = 0; i < items.length; i++) {
      $scope.items.push(items[i].data);
    }
    $scope.after = "t3_" + $scope.items[$scope.items.length - 1].id;
    $scope.busy = false;
  };
  	//Initializer
	init();
	function init(){
		
		
	};
	
});

//404 Page
smApp.controller('app404Controller', function($scope){

});

//Active Menu Module
angular.module('smApp').run(function($http, $rootScope, $location) {

//Active menu
 $rootScope.isActive = function (viewLocation) {
        console.log($location.path());
        return viewLocation === $location.path();
 };
 
});