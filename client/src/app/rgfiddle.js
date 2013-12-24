/*global angular*/
angular.
  module('rgfiddle', [
    'templates-main',
    'services.httpCounter',
    'rgfiddle.states',
    'rgfiddle.alerts',
    'rgfiddle.robots',
    'rgfiddle.scenarios'
  ]).
  run(['$rootScope', '$state', '$stateParams',
       function ($rootScope, $state, $stateParams) {
         $rootScope.$state = $state;
         $rootScope.$stateParams = $stateParams;
       }]);
