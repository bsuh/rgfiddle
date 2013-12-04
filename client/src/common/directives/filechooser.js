/*global angular*/
angular.
  module('directives.filechooser', []).
  directive('filechooser', function () {
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
        'buttonClass': '@',
        'change': '&'
      },
      template: '<button ng-if="fileApiSupported"' +
        'class="{{buttonClass}}"><div ng-transclude></div></button>' +
        '<input type="file" class="ng-hide" />',
      link: function (scope, element) {
        scope.fileApiSupported = !!window.File && !!window.FileList &&
          !!window.FileReader;

        element.find('input').on('change', function (e) {
          scope.change({ files: e.target.files });
        });

        element.on('click', 'button', function () {
          element.find('input').click();
        });
      }
    };
  });
