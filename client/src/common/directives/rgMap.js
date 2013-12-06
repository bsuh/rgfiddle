/*global angular*/
angular.
  module('directives.map', ['directives.box']).
  directive('rgMap', function () {
    return {
      restrict: 'EA',
      templateUrl: '/client/src/common/directives/rgMap.tpl.html',
      scope: true,
      compile: function (element, attrs) {
        element.find('.board rg-box').
          each(function () {
            angular.element(this).attr('board', attrs.board);
          });

        return function (scope, element, attrs) {
          if (attrs.click) {
            element.on('click', '.box', function () {
              var boxElement = angular.element(this);
              var index = boxElement.index();

              boxElement.addClass('selected').
                siblings().removeClass('selected');

              scope.$apply(function () {
                scope.$parent.$eval(attrs.click, { index: index });
              });
            });
          }
        };
      }
    };
  });
