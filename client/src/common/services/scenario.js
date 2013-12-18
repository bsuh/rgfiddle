/*global angular*/
angular.
  module('services.scenario', ['ngResource']).
  factory('$scenario', ['$resource', function ($resource) {
    return $resource('/v1/scenarios/:id');
  }]);
