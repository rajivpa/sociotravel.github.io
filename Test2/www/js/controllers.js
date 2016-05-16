angular.module('app.controllers', [])
  .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$stateParams', function($scope, $rootScope, $state, $stateParams) {

      $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
        console.log(toState);
      });

    }])

.controller('tripsCtrl', ['$scope','TripsFactory','Loader',
    function($scope,TripsFactory,Loader) {
	$scope.upcomingTrips = []
	/*$scope.upcomingTrips = [
		{"from":"Delhi", "to":"Pune", "airlines":"Jet Airways", "flightNo":"9W228","departureDate":"29-May-2016","departureTime":"11:50am"},
		{"from":"Pune", "to":"Delhi", "airlines":"Indigo", "flightNo":"IG221","departureDate":"9-June-2016","departureTime":"01:20am"},
		{"from":"Delhi", "to":"Bangalore", "airlines":"Spice Jet", "flightNo":"SJ2278","departureDate":"25-June-2016","departureTime":"10:25am"},
		{"from":"Delhi", "to":"Bangalore", "airlines":"Spice Jet", "flightNo":"SJ2278","departureDate":"25-June-2016","departureTime":"10:25am"}
	];*/

   // {"from":"Delhi", "to":"Pune", "travelDate":"29-May-2016","invitesSent":"","invitesRecvd":"","buddyName":""}

// {"from":"Delhi", "to":"Pune", "travelDate":"29-May-2016","rating":"","invitesSent":"","invitesRecvd":"","buddyName":""}


    Loader.showLoading();

    TripsFactory.get().success(function(data){
        console.log(data);
        $scope.upcomingTrips = data;
        Loader.hideLoading();
    }).error(function(err,statusCode){
        Loader.hideLoading();
        Loader.toggleLoadingWithMessage(err.message);
    })
    
}])
   
.controller('findABuddyCtrl', function($scope) {

    /*registeredPersonId, fromCity, toCity, travelMood, travelDate*/
   
    $scope.showSearchByTrip=false;

    $scope.showSearchPg= function(id){
        if(id=="free")
            $scope.showSearchByTrip=false;            
        else if(id=="trip")
            $scope.showSearchByTrip=true;
    
    }
})
      
.controller('searchByTripCtrl',function($scope){
    jQuery(function(){
    var onClass = 'on';
    var showClass = 'show';
    jQuery('#upcTrpSel').bind('checkval', function () {
        var label = jQuery('#selUpcTripLab');
        //console.log(this.value);
        if (this.value !== 'selurtrip')
            jQuery('#selUpcTripLab').addClass(showClass);
        else
            jQuery('#selUpcTripLab').removeClass(showClass);
    }).on("focus", function () 
    {
      jQuery('#selUpcTripLab').addClass(onClass);
    });
    jQuery('#upcTrpSel').on('change', function () {
        var jQuerythis = jQuery(this);
     //   console.log(jQuery(this));
        if (jQuerythis.val() == 'selurtrip')
            jQuerythis.addClass('watermark');
        else
            jQuerythis.removeClass('watermark');
        jQuerythis.trigger('checkval');
    }).change();
    });
})

.controller('freeSearchCtrl',function($scope){
  $scope.freeSearchFilter  = {'prefDesired':false}
})

.controller('invitesCtrl', function($scope) {

})
   
.controller('ratingsCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope) {

})
   
.controller('planATripCtrl', function($scope) {
	
/*registeredPersonId, fromCity, toCity, travelDate, travelMood*/

    $scope.tripData={};
    

    jQuery(function(){
    var onClass = 'on';
    var showClass = 'show';
    jQuery('#testsel').bind('checkval', function () {
        var label = jQuery('#testLab');
        //console.log(this.value);
        if (this.value !== 'airlines')
            jQuery('#testLab').addClass(showClass);
        else
            jQuery('#testLab').removeClass(showClass);
    }).on("focus", function () 
    {
      jQuery('#testLab').addClass(onClass);
    });
    jQuery('#testsel').on('change', function () {
        var jQuerythis = jQuery(this);
     //   console.log(jQuery(this));
        if (jQuerythis.val() == 'airlines')
            jQuerythis.addClass('watermark');
        else
            jQuerythis.removeClass('watermark');
        jQuerythis.trigger('checkval');
    }).change();
    });
})
   
.controller('planATrip2Ctrl', function($scope) {

})
   
.controller('planATrip3Ctrl', function($scope) {

})
   
.controller('buddySearchResultsCtrl', function($scope) {

})
   
.controller('messagesCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})

 