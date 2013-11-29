/*global angular*/
angular.
  module('rgfiddle.states', ['ui.router']).
  config(
    ['$stateProvider', '$urlRouterProvider',
     function($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.otherwise('/robots');

       $stateProvider.
         state('robots', {
           url: '/robots',
           templateUrl: '/client/src/app/robots/robots.tpl.html'
         });
     }]);
