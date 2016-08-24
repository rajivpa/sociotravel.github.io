angular.module('app.controllers', ['ionic.rating'])
  .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$stateParams',
      function($scope, $rootScope, $state, $stateParams) {
          $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
      });
}])
//This controllers is for Trips view and controls the Upcoming & Past Trip loading
//and visualization
.controller('tripsCtrl', ['$scope','$stateParams','$state','TripsFactory','Loader',
  function($scope,$stateParams,$state, TripsFactory,Loader) {
    //msg shown while loading / no trip found
    $scope.noUpcomingTripMsg="Loading...";
    //msg shown while loading / no trip founds
    $scope.noPastTripMsg="Loading..."
    //Set the active type
    $scope.activeTripType='upcoming';
    $scope.pastTripsExists={status:false};
    //upcoming trips array
    $scope.upcomingTrips=[];
    //past trips array
    $scope.pastTrips=[];
    //flag to show delete button
    $scope.shouldShowDelete = false;
    //flag to show no trip message or to show upcoming trips container
    $scope.upcomingTripsExists={status:false};   
    //enable list swipe to show delete button
    $scope.listCanSwipe = true;
    //control the height of trips containers
    $scope.scrollHeight=0;
    //calculate the responsive spacer height when no trips are found
    var scrnHeight=window.screen.height-44-67-47;
    var spacerHeight=scrnHeight*36/100;
    $scope.spacerHeight=spacerHeight+'px';
    //rating obj
    $scope.rating = {};
    //Call API to get upcomingTrips for user
    $scope.loadUpcomingTrips = function(){
      //API call to get Upcoming Trips
      TripsFactory.get('upcomingTrips').then(function(response){
        //console.log(response);
        //assign the returned data to scope variable so that UI updates
        //automatically
        $scope.upcomingTrips = response.data;
        //If data array lenght is nonzero then show the upcoming trips container
        //else show no trip message
        if(response.data.length > 0){
             //Set the flag to show the upcoming trip container
             $scope.upcomingTripsExists.status=true;
             //Calculate relative height of upcoming trips container. This makes it
             //pretty responsive irrespective of mobile device height. Kept at 70%
             //of device height to start with
             $scope.scrollHeight=window.screen.height*70/100+'px';
        }
        else{
            $scope.noUpcomingTripMsg="No Upcoming Trips Yet";
            $scope.upcomingTripsExists.status=false;
            $scope.scrollHeight=0;
        }
        //hide the loading icon
        Loader.hideLoading();
      },function(response){
          console.log(response);
          Loader.hideLoading();    
          $scope.upcomingTripsExists.status=false;
          $scope.scrollHeight=0;
          $scope.noUpcomingTripMsg="Unable to load Upcoming Trips.";
          if(response.data)
            Loader.toggleLoadingWithMessage(response.data.message);
      });
    }
    //Call API to get pastTrips for user
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
                $scope.noPastTripMsg="No Past Trips found"
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
    //Toggle the delete button visibility
    $scope.setShowDelete = function(){
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
    }
    //Delete the selected upcoming trip.@ToDo Call delete API
    $scope.deleteUpcomingTrip= function(tripIndex){
        upcomingTrips.splice(tripIndex, 1);
    }
    //Set the active tab and do corresponding API call to load data
    $scope.setActive = function(tripType){
      if(tripType=='past') $scope.loadPastTrips()
      else if(tripType == 'upcoming') $scope.loadUpcomingTrips();
      $scope.activeTripType=tripType;
    }
    //Check if the passed in tab is active
    $scope.isActive = function(tripType){
      return tripType === $scope.activeTripType;
    }
    //$scope.tripId = $stateParams.tripId;
    //By Default loadthe upcoming trips 
    Loader.showLoading();
    $scope.loadUpcomingTrips();  
    $scope.loadPastTrips();   
}])
//This controller is for the Trip Details view. It controls the loading and visualization
//of trip details, visualization of search buddy results for that trip, visualization of
//invites sent / received for tha trip 
.controller('tripDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams','TripsFactory',
  function($scope, $rootScope, $state, $stateParams,TripsFactory) {
    $scope.tripDetails = "";
    $scope.scrollHeight=window.screen.height*60/100+'px';
    $scope.activeSel='matchingProfiles';
    $scope.travellerMatches=[];
    $scope.interestsRecvd=[];
    $scope.interestsSent=[];
    //load trip details on click of item from Trip list (upcoming/past)
    //use the $state.go to load the trip details view
    $scope.loadTripDetails = function(tripId){
      TripsFactory.getTripDetails(tripId).success(function(data){
        $scope.tripDetails = data;
       // $state.go("menu.planATrip3");
      }).error(function(err,statusCode){
        console.log(err);
      });
    } 
    //for a given trip load matching travellers
    $scope.loadMatchingTravellers = function(userId,tripId){
      TripsFactory.getMatchingTravellers(userId,tripId).success(function(data){
        $scope.travellerMatches = data;
      }).error(function(err,statusCode){
        console.log(err);
      });
    }
    //for a given trip load invites received
    $scope.loadInterestsRecvd = function(userId,tripId){
      TripsFactory.getInterestsRecvd(userId,tripId).success(function(data){
        $scope.interestsRecvd = data;
      }).error(function(err,statusCode){
        console.log(err);
      });
    }
    //for a given trip load invites sent
    $scope.loadInterestsSent = function(userId,tripId){
      TripsFactory.getInterestsRecvd(userId,tripId).success(function(data){
        $scope.interestsSent = data;
      }).error(function(err,statusCode){
        console.log(err);
      });
    }
    //set the active tab based on click and load corresponding data
    $scope.setActive = function(sel){
      if(sel=='matchingProfiles') $scope.loadMatchingTravellers()
      else if(sel == 'interestsRecvd') $scope.loadInterestsRecvd();
      else if(sel == 'interestsSent') $scope.loadInterestsSent();
      $scope.activeSel=sel;
    }
    //check if tab is active
    $scope.isActive = function(sel){
      return sel === $scope.activeSel;
    }
    //get trip details & matching travellers on page load
    $scope.loadTripDetails();
    $scope.loadMatchingTravellers();
    $scope.loadInterestsRecvd();
    $scope.loadInterestsSent();
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

.controller('buddySearchResultsCtrl', ['$scope','$stateParams','$state','TripsFactory','Loader',
  function($scope,$stateParams,$state, TripsFactory,Loader) {
  
  $scope.travellerMatches = [];
  $scope.searchTravellers = function(from,to,travelDt){
    TripsFactory.getMatchingTravellers(null,null).success(function(data){
      $scope.travellerMatches = data;
    }).error(function(err,statusCode){
      console.log(err);
    });
  }
  $scope.searchTravellers();
}])

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

.controller('WelcomeCtrl', function($scope, $state, $q, UserService, $ionicLoading) {
  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    alert("resp")
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('app.home');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){

    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
      );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
   try{ 
    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
  }catch(err){
    alert(err)
  }
  facebookConnectPlugin.getLoginStatus(function(success){

    if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $state.go('app.home');
        }
      } else {

        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    },function(error){
      alert(error);
    });
};
})
