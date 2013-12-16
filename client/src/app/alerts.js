/*global angular*/
angular.
  module('rgfiddle.alerts', ['services.alerts', 'ui.bootstrap']).
  controller('AlertCtrl', ['$scope', 'alerts', function ($scope, alerts) {
    $scope.alerts = alerts.alerts;
  }]);
