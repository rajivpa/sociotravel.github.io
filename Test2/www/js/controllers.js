angular.module('app.controllers', ['ionic.rating'])
.controller('AppCtrl', ['$scope', '$rootScope', '$state', '$stateParams',
 function($scope, $rootScope, $state, $stateParams) {

  $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {

});

}])

.controller('tripsCtrl', ['$scope','TripsFactory','Loader',
  function($scope,TripsFactory,Loader) {
    $scope.noUpcomingTripMsg="No Upcoming Trips Yet";
    $scope.noPastTripMsg="No Past Trips found"
    $scope.activeTripType='upcoming';
    $scope.pastTripsExists={status:false};
    //upcoming trips array
    $scope.upcomingTrips=[];
    $scope.pastTrips=[];
    //flag to show delete button
    $scope.shouldShowDelete = false;
    //flag to show no trip message or to show the upcoming trip container
    $scope.upcomingTripsExists={status:false};   
    //enable list swipe to show delete button
    $scope.listCanSwipe = true;
    $scope.scrollHeight=0;
    //calculate the responsive spacer height when no trips are found
    var scrnHeight=window.screen.height-44-67-47;
    var spacerHeight=scrnHeight*36/100;
    $scope.spacerHeight=spacerHeight+'px';

     $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;

    $scope.loadUpcomingTrips = function(){
      //API call to get Upcoming Trips
      TripsFactory.get('upcomingTrips').success(function(data){
        $scope.upcomingTrips = data;
        if(data.length > 0){
          $scope.upcomingTripsExists.status=true;
              //Calculate relative height of upcoming trips container. This makes it
             //pretty responsive irrespective of mobile device height. Kept at 70%
             //of device height to start with
             $scope.scrollHeight=window.screen.height*70/100+'px';
           }
           else{
            $scope.upcomingTripsExists.status=false;
            $scope.scrollHeight=0;
          }
          Loader.hideLoading();
        }).error(function(err,statusCode){
          Loader.hideLoading();
          
          $scope.upcomingTripsExists.status=false;
          $scope.scrollHeight=0;
          $scope.noUpcomingTripMsg="Unable to load Upcoming Trips.";
          if(err)
           Loader.toggleLoadingWithMessage(err.message);
       });
    }

    $scope.loadPastTrips = function(){
      //API call to get Past Trips 
      TripsFactory.get('pastTrips').success(function(data){
        $scope.pastTrips = data;
        if(data.length > 0){
          $scope.pastTripsExists.status=true;
              //Calculate relative height of upcoming trips container. This makes it
             //pretty responsive irrespective of mobile device height. Kept at 70%
             //of device height to start with
             $scope.scrollHeight=window.screen.height*70/100+'px';
           }
           else{
            $scope.pastTripsExists.status=false;
            $scope.scrollHeight=0;
          }
          Loader.hideLoading();
        }).error(function(err,statusCode){
          Loader.hideLoading();
          $scope.pastTripsExists.status=false;
          $scope.scrollHeight=0;
          $scope.noPastTripMsg="Unable to load Past Trips.";
          if(err != null)
            Loader.toggleLoadingWithMessage(err.message);
        });    
    }

    $scope.setShowDelete = function(){
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
    }

    $scope.deleteUpcomingTrip= function(tripIndex){
      upcomingTrips.splice(tripIndex, 1);
      //Make API call to delete trip. Need Trip Id for this
    }

    $scope.setActive = function(tripType){
      if(tripType=='past') $scope.loadPastTrips()
        else if(tripType == 'upcoming') $scope.loadUpcomingTrips();
      $scope.activeTripType=tripType;
    }

    $scope.isActive = function(tripType){

      return tripType === $scope.activeTripType;
    }

    //By Default loadthe upcoming trips 
    Loader.showLoading();
    $scope.loadUpcomingTrips(); 
    
  }])

.controller('findABuddyCtrl', ['$scope', '$rootScope', '$state', '$stateParams',
 function($scope, $rootScope, $state, $stateParams) {
  /*registeredPersonId, fromCity, toCity, travelMood, travelDate*/

  $scope.showSearchByTrip=false;

  if(!$rootScope.isLoggedIn)
    $scope.pgTitle=" See Who's Travelling";
  else
    $scope.pgTitle="Find A Buddy"

  $scope.showSearchPg= function(id){
    if(id=="free")
      $scope.showSearchByTrip=false;            
    else if(id=="trip")
      $scope.showSearchByTrip=true;

  }
}])

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

.controller('freeSearchCtrl',['$scope', '$rootScope', '$state', '$stateParams',
 function($scope, $rootScope, $state, $stateParams) {

  $scope.freeSearchFilter  = {'prefDesired':false}
}])

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



.controller('signupCtrl', ['$scope', '$rootScope', '$state', '$stateParams',
 function($scope, $rootScope, $state, $stateParams) {

   $scope.signIn = function(){
    $rootScope.isLoggedIn=true;
    $state.go('menu.trips')
  };

}])

.controller('loginCtrl', function($scope) {

})

