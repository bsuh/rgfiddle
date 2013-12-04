/*global angular*/
angular.
  module('rgfiddle.robots',
         ['rgfiddle.robots.editor', 'rgfiddle.robots.match', 'ui.bootstrap']).
  controller('RobotsCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.robots = [];

    $scope.newRobot = {
      id: null,
      name: 'Guardian',
      code: 'class Robot:\n' +
        '    def act(self, game):\n' +
        '        return [\'guard\']'
    };

    function error(msg) {
      $scope.alerts.push({type: 'danger', msg: msg });
    }

    $scope.getRobots = function () {
      $http.get('/v1/robots/').success(function (data) {
        $scope.robots = data.robots;
        $scope.robots.unshift($scope.newRobot);
      }).error(function () {
        $scope.alerts.push({
          type: 'danger',
          msg: 'Could not obtain list of robots'
        });
      });
    };

    $scope.updateRobot = function (index, remove) {
      var robot = $scope.robots[index];
      var id = robot.id;

      if (remove) {
        if (window.confirm('Are you sure you want to delete this robot?' +
                           ' You cannot undo this!')) {
          $http['delete']('/v1/robots/' + id, robot).success(function (data) {
            if (data.rows > 0) {
              var index = $scope.robots.indexOf(robot);
              if (index !== -1) {
                $scope.robots.splice(index, 1);
              }
            } else {
              error('Could not find robot to delete');
            }
          }).error(function () {
            error('Could not delete robot');
          });
        }
      } else if (!id) {
        $http.post('/v1/robots/', robot).success(function (data) {
          $scope.robots.push(data.robot);
        }).error(function () {
          error('Could not create robot');
        });
      } else {
        $http.put('/v1/robots/' + id, robot).success(function (data) {
          angular.extend(robot, data.robot);
        }).error(function () {
          error('Could not update robot');
        });
      }
    };
  }]);
