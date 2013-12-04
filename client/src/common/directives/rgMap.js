/*global angular*/
angular.
  module('directives.map', []).
  directive('rgMap', function () {
    return {
      restrict: 'EA',
      scope: {
        board: '=',
        click: '&'
      },
      templateUrl: '/client/src/common/directives/rgMap.tpl.html',
      link: function (scope, element, attrs) {
        if (attrs.click) {
          element.on('click', '.box', function () {
            var boxElement = angular.element(this);
            var index = boxElement.index();

            boxElement.addClass('selected').
              siblings().removeClass('selected');

            scope.$apply(function () {
              scope.click({ index: index });
            });
          });
        }
      }
    };
  });
