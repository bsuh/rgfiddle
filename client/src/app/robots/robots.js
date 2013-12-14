/*global angular*/
angular.
  module('rgfiddle.robots', [
    'rgfiddle.robots.editor',
    'rgfiddle.robots.match',
    'ui.bootstrap',
    'ngResource'
  ]).
  controller('RobotsCtrl', [
    '$scope', '$http', '$resource',
    function ($scope, $http, $resource) {
      var Robot = $resource('/v1/robots/:id');

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
        $scope.robots = Robot.query(function () {
          $scope.robots.unshift($scope.newRobot);
        }, function () {
          error('Could not obtain list of robots');
        });
        $scope.robots.unshift($scope.newRobot);
      };

      $scope.updateRobot = function (index, remove) {
        var robot = $scope.robots[index];
        var id = robot.id;

        if (remove) {
          if (window.confirm('Are you sure you want to delete this robot?' +
                             ' You cannot undo this!')) {
            Robot.remove({ id: id }, function (data) {
              if (data.rows > 0) {
                var index = $scope.robots.indexOf(robot);
                if (index !== -1) {
                  $scope.robots.splice(index, 1);
                }
              } else {
                error('Could not find robot to delete');
              }
            }, function () {
              error('Could not delete robot');
            });
          }
        } else {
          Robot.save({ id: id }, robot, function (data) {
            if (!id) {
              $scope.robots.push(data.robot);
            } else {
              angular.extend(robot, data.robot);
            }
          }, function () {
            error('Could not ' + (id ? 'update' : 'create') + ' robot');
          });
        }
      };
    }]);
