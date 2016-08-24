var base = 'http://192.168.0.193:3000'

angular.module('app.services', [])
.factory('Loader', ['$ionicLoading','$timeout',function($ionicLoading,$timeout){
	var LOADERAPI = {
		showLoading: function(text) {
			text = text || 'Loading...';
			$ionicLoading.show({
				template: text
			});
		},
		hideLoading: function() {
			$ionicLoading.hide();
		},
		toggleLoadingWithMessage: function(text, timeout) {
			$rootScope.showLoading(text);
			$timeout(function() {
				$rootScope.hideLoading();
			}, timeout || 5000);
		}
	};
	return LOADERAPI;
}])

.factory('TripsFactory', ['$http', function($http) {

	var API = {
		get: function(tripType) {
			return $http.get(base + '/'+tripType,{timeout:500});
		},

		getTripDetails: function(tripId){
			return $http.get(base + '/tripDetails',{timeout:3000});

		},

		getMatchingTravellers: function(userId,tripId){
			return $http.get(base + '/searchBuddy',{timeout:3000});		
		},

		getInterestsRecvd: function(userId,tripId){
			return $http.get(base + '/interestsRecvd',{timeout:3000});		
		}	
	}
	return API;
}])

.service('BlankService', [function(){

}])

.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
  	window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
  	return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
  	getUser: getUser,
  	setUser: setUser
  };
});