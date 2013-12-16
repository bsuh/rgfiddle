/*global angular*/
angular.
  module('rgfiddle.robots', [
    'rgfiddle.robots.editor',
    'rgfiddle.robots.match',
    'ui.bootstrap',
    'services.robot',
    'services.alerts'
  ]).
  controller('RobotsCtrl', [
    '$scope', '$robot', 'alerts', function ($scope, $robot, alerts) {
      $scope.robots = [];

      $scope.newRobot = {
        id: null,
        name: 'Guardian',
        code: 'class Robot:\n' +
          '    def act(self, game):\n' +
          '        return [\'guard\']'
      };

      $scope.getRobots = function () {
        $scope.robots = $robot.query(function () {
          $scope.robots.unshift($scope.newRobot);
        }, function () {
          alerts.error('Could not obtain list of robots');
        });
        $scope.robots.unshift($scope.newRobot);
      };

      $scope.updateRobot = function (index, remove) {
        var robot = $scope.robots[index];
        var id = robot.id;

        if (remove) {
          if (window.confirm('Are you sure you want to delete this robot?' +
                             ' You cannot undo this!')) {
            $robot.remove({ id: id }, function (data) {
              if (data.rows > 0) {
                var index = $scope.robots.indexOf(robot);
                if (index !== -1) {
                  $scope.robots.splice(index, 1);
                }
              } else {
                alerts.error('Could not find robot to delete');
              }
            }, function () {
              alerts.error('Could not delete robot');
            });
          }
        } else {
          $robot.save({ id: id }, robot, function (data) {
            if (!id) {
              $scope.robots.push(data.robot);
            } else {
              angular.extend(robot, data.robot);
            }
          }, function () {
            alerts.error('Could not ' + (id ? 'update' : 'create') + ' robot');
          });
        }
      };
    }]);
