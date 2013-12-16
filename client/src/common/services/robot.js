/*global angular*/
angular.
  module('services.robot', ['ngResource']).
  factory('$robot', ['$resource', function ($resource) {
    return $resource('/v1/robots/:id');
  }]);
