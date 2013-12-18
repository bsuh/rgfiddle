/*global angular*/
angular.module('services.httpCounter', [])
  .config(function ($provide, $httpProvider) {
    $provide.factory('HttpCounter', [
      '$rootScope', '$q', function ($rootScope, $q) {
        return {
          request: function (config) {
            $rootScope.global.requestCount += 1;

            return config || $q.when(config);
          },

          response: function (response) {
            $rootScope.global.requestCount -= 1;

            return response || $q.when(response);
          },

          responseError: function (rejection) {
            $rootScope.global.requestCount -= 1;

            return $q.reject(rejection);
          }
        };
      }]);

    $httpProvider.interceptors.push('HttpCounter');
  }).run(['$rootScope', function ($rootScope) {
    $rootScope.global = $rootScope.global || {};
    $rootScope.global.requestCount = 0;
  }]);
