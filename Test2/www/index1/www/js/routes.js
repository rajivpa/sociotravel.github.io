angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('menu.trips', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/trips.html',
        controller: 'tripsCtrl'
      }
    }
  })

  .state('menu.findABuddy', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/findABuddy.html',
        controller: 'findABuddyCtrl',

      }
    }
  })

  .state('menu.findABuddy.searchByTrip', {
    url: '/searchByTrip',
    views: {
      'tab-searchByTrip': {
        templateUrl: 'templates/searchByTrip.html',
        controller: 'findABuddyCtrl',
         
      }
    }
  })

  .state('menu.findABuddy.freeSearch', {
    url: '/freeSearch',

    views: {
      'tab-freeSearch': {
        templateUrl: 'templates/freeSearch.html',
        controller: 'findABuddyCtrl',

      }
    }
  })
  .state('menu.freeSearch', {
    url: '/freeSearch',

    views: {
      'side-menu21': {
        templateUrl: 'templates/freeSearch.html',
        controller: 'findABuddyCtrl',

      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.invites', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/invites.html',
        controller: 'invitesCtrl'
      }
    }
  })

  .state('menu.ratings', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ratings.html',
        controller: 'ratingsCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('menu.planATrip', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/planATrip.html',
        controller: 'planATripCtrl'
      }
    }
  })

  .state('menu.planATrip2', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/planATrip2.html',
        controller: 'planATripCtrl'
      }
    }
  })

  .state('menu.planATrip3', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/planATrip3.html',
        controller: 'planATripCtrl'
      }
    }
  })

  .state('menu.buddySearchResults', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/buddySearchResults.html',
        controller: 'buddySearchResultsCtrl'
      }
    }
  })
.state('menu.webCheckIn', {
    url: '/page21',
    views: {
      'side-menu21': {
        templateUrl: 'templates/webcheckin.html',
        controller: 'planATripCtrl'
      }
    }
  })
  .state('messages', {
    url: '/page12',
    templateUrl: 'templates/messages.html',
    controller: 'messagesCtrl'
  })

  .state('login', {
    url: '/page15',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })
.state('landingHome', {
    url: '/page20',
    templateUrl: 'templates/landingHome.html',
    controller: 'signupCtrl'
  })


$urlRouterProvider.otherwise('/page20')

  

});