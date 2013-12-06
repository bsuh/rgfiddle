/*global angular*/
angular.
  module('directives.box', []).
  directive('rgBox', function () {
    return {
      restrict: 'EA',
      replace: true,
      template: '<span></span>',
      link: function (scope, element, attrs) {
        var unwatch = scope.$watch(
          attrs.board + '[' + attrs.index + ']', function (newVal) {
            if (newVal.type === 'obstacle') {
              element.replaceWith('<span class="box obstacle"></span>');
              unwatch();
            } else if (newVal.type === 'normal') {
              element.removeClass().addClass('box normal');
              while (element[0].hasChildNodes()) {
                element[0].removeChild(element[0].lastChild);
              }
            } else {
              element.removeClass().addClass([
                'box', newVal.type, newVal.action].join(' '));

              if (element[0].hasChildNodes()) {
                element[0].firstChild.nodeValue = newVal.hp;
                angular.element(element[0].lastChild).removeClass().
                  addClass([
                    'glyphicon',
                    'glyphicon-arrow-' + newVal.target,
                    'text-' + (newVal.action === 'move' ? 'primary' : 'danger')
                  ].join(' '));
              } else {
                element.append(document.createTextNode(newVal.hp));

                if (newVal.target) {
                  var action = angular.element('<span></span>');
                  action.addClass([
                    'glyphicon',
                    'glyphicon-arrow-' + newVal.target,
                    'text-' + (newVal.action === 'move' ? 'primary' : 'danger')
                  ].join(' '));
                  element.append(action);
                }
              }
            }
          });
      }
    };
  });
