/*global angular*/
angular.
  module('directives.map', []).
  directive('rgMap', function () {
    return {
      restrict: 'EA',
      scope: {
        board: '='
      },
      templateUrl: '/client/src/common/directives/rgMap.tpl.html'
    };
  });
