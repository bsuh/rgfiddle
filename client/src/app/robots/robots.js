/*global angular*/
angular.
  module('rgfiddle.robots',
         [
           'rgfiddle.robots.editor',
           'rgfiddle.robots.match',
           'ui.bootstrap',
         ]).
  controller('RobotsCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.robots = [];

    $scope.newRobot = {
      id: null,
      name: 'Guardian',
      code: 'class Robot:\n' +
        '    def act(self, game):\n' +
        '        return [\'guard\']'
    };

    $scope.codeMirrorOptions = function (code) {
      return {
        mode: 'python',
        lineNumbers: true,
        value: code,
        indentUnit: 4,
        extraKeys: {
          Tab: function(cm) {
            var spaces = new Array(cm.getOption('indentUnit') + 1).join(' ');
            cm.replaceSelection(spaces, 'end', '+input');
          }
        }
      };
    };

    $scope.getRobots = function () {
      $http.get('/v1/robots/').success(function (data) {
        $scope.robots = data.robots;
        $scope.robots.unshift($scope.newRobot);
      });
    };

    $scope.updateRobot = function (index, remove) {
      var robot = $scope.robots[index];
      var id = robot.id;

      if (remove) {
        if (window.confirm('Are you sure you want to delete this robot? You cannot undo this!')) {
          $http['delete']('/v1/robots/' + id, robot).success(function (data) {
            if (data.rows > 0) {
              var index = $scope.robots.indexOf(robot);
              if (index !== -1) {
                $scope.robots.splice(index, 1);
              }
            }
          });
        }
      } else if (!id) {
        $http.post('/v1/robots/', robot).success(function (data) {
          $scope.robots.push(data.robot);
        });
      } else {
        $http.put('/v1/robots/' + id, robot).success(function (data) {
          angular.extend(robot, data.robot);
        });
      }
    };
  }]);
