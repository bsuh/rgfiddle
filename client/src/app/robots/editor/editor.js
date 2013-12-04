/*global angular*/
angular.
  module('rgfiddle.robots.editor',
         ['directives.keepModelValue', 'ui.codemirror']).
  run(['$rootScope', function ($rootScope) {
    $rootScope.codeMirrorOptions = {
      mode: 'python',
      lineNumbers: true,
      theme: 'default',
      indentUnit: 4,
      extraKeys: {
        Tab: function(cm) {
          var spaces = new Array(cm.getOption('indentUnit') + 1).join(' ');
          cm.replaceSelection(spaces, 'end', '+input');
        }
      }
    };
  }]).
  controller('EditorCtrl', ['$scope', function ($scope) {
    $scope.themes = [
      'default',
      '3024-day',
      '3024-night',
      'ambiance',
      'base16-dark',
      'base16-light',
      'blackboard',
      'cobalt',
      'eclipse',
      'elegant',
      'erlang-dark',
      'lesser-dark',
      'mbo',
      'midnight',
      'monokai',
      'neat',
      'night',
      'paraiso-dark',
      'paraiso-light',
      'rubyblue',
      'solarized',
      'the-matrix',
      'tomorrow-night-eighties',
      'twilight',
      'vibrant-ink',
      'xq-dark',
      'xq-light'
    ];
  }]);
