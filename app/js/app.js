'use strict';

// Declare app level module which depends on filters, and services
angular.module('relevantWeb', ['relevantWeb.filters', 'relevantWeb.services', 'relevantWeb.directives']).
   config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: SearchController});
      $routeProvider.otherwise({redirectTo: '/home'});
}]);
