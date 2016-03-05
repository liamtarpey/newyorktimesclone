app.config(

/* @ngInject */
function(
  $routeProvider, $locationProvider
) {

  // Routing
 	$routeProvider
    .when('/', {
      templateUrl: '/dist/views/feed/feed.html'
    })
    .otherwise({
      redirectTo: '/404'
    });

  $locationProvider.html5Mode({
  	enabled: true,
  	requireBase: false
  });
});
