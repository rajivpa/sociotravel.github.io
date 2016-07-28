angular.module('app.controllers', ['ionic.rating'])
.controller('AppCtrl', ['$scope', '$rootScope', '$state', '$stateParams',
 function($scope, $rootScope, $state, $stateParams) {
  
  $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
  
});

}])

.controller('tripsCtrl', ['$scope','$stateParams','$state','TripsFactory','Loader',
  function($scope,$stateParams,$state, TripsFactory,Loader) {
    $scope.noUpcomingTripMsg="Loading...";
    $scope.noPastTripMsg="Loading..."
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
            $scope.noUpcomingTripMsg="No Upcoming Trips Yet";
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

        
    //$scope.tripId = $stateParams.tripId;
    //By Default loadthe upcoming trips 
    Loader.showLoading();
    $scope.loadUpcomingTrips(); 
    
  }])

.controller('tripDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams','TripsFactory',
 function($scope, $rootScope, $state, $stateParams,TripsFactory) {
  $scope.tripDetails = "";
  $scope.scrollHeight=window.screen.height*60/100+'px';
  $scope.activeSel='matchingProfiles';
  $scope.travellerMatches=[];
  $scope.interestsRecvd=[];
  $scope.interestsSent=[];

  $scope.loadTripDetails = function(tripId){
       TripsFactory.getTripDetails(tripId).success(function(data){
        $scope.tripDetails = data;
      
        $state.go("menu.planATrip3");
      }).error(function(err,statusCode){
        console.log(err);
      });
    }
    $scope.loadMatchingTravellers = function(userId,tripId){
      TripsFactory.getMatchingTravellers(userId,tripId).success(function(data){
        $scope.travellerMatches = data;
      }).error(function(err,statusCode){
        console.log(err);
      });
    }
    $scope.loadInterestsRecvd = function(userId,tripId){
      TripsFactory.getInterestsRecvd(userId,tripId).success(function(data){
        $scope.interestsRecvd = data;
      }).error(function(err,statusCode){
        console.log(err);
      });
    }
    $scope.loadInterestsSent = function(userId,tripId){
      TripsFactory.getInterestsRecvd(userId,tripId).success(function(data){
        $scope.interestsSent = data;
      }).error(function(err,statusCode){
        console.log(err);
      });
    }
    $scope.setActive = function(sel){
      if(sel=='matchingProfiles') $scope.loadMatchingTravellers()
      else if(sel == 'interestsRecvd') $scope.loadInterestsRecvd();
      else if(sel == 'interestsSent') $scope.loadInterestsSent();
      $scope.activeSel=sel;
    }

    $scope.isActive = function(sel){
      
      return sel === $scope.activeSel;
    }
    $scope.loadTripDetails();
    $scope.loadMatchingTravellers();
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
