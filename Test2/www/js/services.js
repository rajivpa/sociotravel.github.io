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
		//return $http.get(base + '/travelBuddy/api/v1/upcomingTrips/');
		return $http.get(base + '/'+tripType,{timeout:500});
	}
	};
	return API;
}])

.service('BlankService', [function(){

}]);

