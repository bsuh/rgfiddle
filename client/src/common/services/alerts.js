/*global angular*/
angular.
  module('services.alerts', []).
  factory('alerts', function () {
    var service = {
      alerts: [],
      error: function (msg) {
        service.alerts.push({ type: 'danger', msg: msg });
      }
    };

    return service;
  });
