/*global angular*/
angular.
  module('rgfiddle.robots', ['directives.map', 'ui.bootstrap', 'ui.codemirror']).
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

    $scope.runMatch = function (index, index2) {
      var robot1 = $scope.robots[index];
      var robot2 = $scope.robots[index2];
      var self = this;

      if (!robot1 || !robot2) {
        return;
      }

      $http.post('/match', {player1: robot1.code, player2: robot2.code}).
        success(function (data) {
          self.match = {
            player1: robot1.name,
            player2: robot2.name,
            turn: 0
          };
          self.history = data.history;
        });
    };

  }]);
