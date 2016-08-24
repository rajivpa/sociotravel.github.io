angular.module('app').run(function($httpBackend) {
  	var upcomingTrips = [
 		{"tripId":0,"from":"Delhi", "to":"Pune", "travelDate":"29-July-2016","invitesSent":"10","invitesRecvd":"5","buddyName":""},
 		{"tripId":1,"from":"Pune", "to":"Delhi", "travelDate":"15-Aug-2016","invitesSent":"0","invitesRecvd":"0","buddyName":""},
 		{"tripId":2,"from":"Pune", "to":"Chennai", "travelDate":"31-Aug-2016","invitesSent":"0","invitesRecvd":"0","buddyName":""},
		{"tripId":3,"from":"Chennai", "to":"Pune", "travelDate":"29-July-2016","invitesSent":"0","invitesRecvd":"0","buddyName":""}
 	];
  	var pastTrips=[
		{"tripId":4,"from":"Delhi", "to":"Pune", "travelDate":"01-July-2016","ratingRecvd":"4","invitesSent":"10","invitesRecvd":"5","buddyName":"John","buddyAvatar":"avatar2.png","commentRecvd":"Enjoyed flight with you"},
 		{"tripId":5,"from":"Pune", "to":"Delhi", "travelDate":"03-July-2016","ratingRecvd":"3","invitesSent":"0","invitesRecvd":"0","buddyName":"Isabel","buddyAvatar":"avatar4.jpg","commentRecvd":"Had a nice time"}
 	];
 	var tripDetails= {"tripId":0,"from":"Delhi", "to":"Pune", "travelDate":"29-July-2016","airlines":"Jet Airways","flightNo":"9W 228","flightTime":"09:30","pnrNo":"22344588","rating":"","invitesSent":"10","invitesRecvd":"5","buddyName":""};

 	var searchBuddy=[
 		{"name":"John","buddyAvatar":"avatar2.png","avgRating":"3","about":"CTO, Cool Startup","age":"34","livesIn":"Delhi","interests":"Photography, Tennis, Politics"},
 		{"name":"Isabel","buddyAvatar":"avatar4.jpg","avgRating":"4","about":"Senior Analyst, Fintech Corp","age":"26","livesIn":"Bangalore","interests":"Travel, Fashion, Music"}
 	];
 	var interestsRecvd=[
 		{"name":"John","buddyAvatar":"avatar2.png","avgRating":"3","about":"CTO, Cool Startup","age":"34","livesIn":"Delhi","interests":"Photography, Tennis, Politics","message":"Would like your company for this trip"},
 		{"name":"Isabel","buddyAvatar":"avatar4.jpg","avgRating":"4","about":"CTO, Cool Startup","age":"34","livesIn":"Delhi","interests":"Travel, Fashion, Music","message":"How about exchanging views on emerging fashion trends!"}
 	];

 	$httpBackend.whenGET('http://192.168.0.193:3000/upcomingTrips').respond(function(method, url, data) { 
        return [200, upcomingTrips, {}];
    });
    
    	$httpBackend.whenGET('http://192.168.0.193:3000/pastTrips').respond(function(method, url, data) { 
        return [200, pastTrips, {}];
    });
    
    	$httpBackend.whenGET('http://192.168.0.193:3000/tripDetails').respond(function(method, url, data) { 
        return [200, tripDetails, {}];
    });
    
    	$httpBackend.whenGET('http://192.168.0.193:3000/searchBuddy').respond(function(method, url, data) { 
        return [200, searchBuddy, {}];
    });
    
    	$httpBackend.whenGET('http://192.168.0.193:3000/interestsRecvd').respond(function(method, url, data) { 
        return [200, interestsRecvd, {}];
    });
    
	 $httpBackend.whenGET(/templates\//).passThrough();
  
});	