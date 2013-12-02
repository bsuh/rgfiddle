/*global angular*/
angular.
  module('directives.keepModelValue', []).
  directive('keepModelValue', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      priority: 1,
      link: function (scope, element, attrs, ngModelCtrl) {
        var oldValue;

        ngModelCtrl.$parsers.push(function (value) {
          if (value === undefined) {
            return oldValue;
          } else {
            oldValue = value;
            return value;
          }
        });
      }
    };
  });
