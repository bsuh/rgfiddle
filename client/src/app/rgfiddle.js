/*global angular*/
angular.
  module('rgfiddle', ['rgfiddle.states', 'rgfiddle.robots']).
  run(['$rootScope', '$state', '$stateParams',
       function ($rootScope, $state, $stateParams) {
         $rootScope.$state = $state;
         $rootScope.$stateParams = $stateParams;
       }]);
