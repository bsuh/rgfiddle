/*global angular*/
angular.
  module('rgfiddle.scenarios', [
    'directives.map',
    'services.alerts',
    'services.robot',
    'services.scenario',
    'ui.bootstrap',
    'ui.keypress'
  ]).
  controller('ScenariosCtrl', [
    '$scope', '$http', '$robot', '$scenario', 'alerts',
    function ($scope, $http, $robot, $scenario, alerts) {
      $scope.testRobot = {};

      $scope.newScenario = {
        name: 'New Scenario',
        /*jshint -W101*/
        board:  JSON.parse('[{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"normal"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"},{"type":"obstacle"}]'),
        /*jshint +W101*/
        turn: 1
      };

      $scope.selectScenario = function (index) {
        $scope.selectedScenario = $scope.scenarios[index];
        if ($scope.robots.length) {
          $scope.runTurn();
        }
      };

      $scope.getScenarios = function () {
        $scope.scenarios = $scenario.query(function () {
          $scope.scenarios.unshift($scope.newScenario);
        });
        $scope.scenarios.unshift($scope.newScenario);
      };

      $scope.updateScenario = function (index, remove) {
        var scenario = $scope.scenarios[index];
        var id = scenario.id;

        if (remove) {
          if (window.confirm('Are you sure you want to delete this scenario?' +
                             ' You cannot undo this!')) {
            $scenario.remove({ id: scenario.id }, function () {
              var index = $scope.scenarios.indexOf(scenario);
              if (index !== -1) {
                $scope.scenarios.splice(index, 1);
              }
            }, function () {
              alerts.error('Could not delete scenario');
            });
          }
        } else {
          var cleanBoard = angular.copy(scenario.board);
          cleanBoard.forEach(function (box) {
            delete box.action;
            delete box.log;
            delete box.target;
          });

          $scenario.save({ id: id }, {
            name: scenario.name,
            board: cleanBoard,
            turn: scenario.turn
          }, function (_scenario) {
            if (!id) {
              $scope.scenarios.push(_scenario);
            } else {
              angular.extend(scenario, _scenario);
            }
          }, function () {
            alerts.error('Could not ' + (id ? 'update' : 'create') +
                         ' scenario');
          });
        }
      };

      $scope.getRobots = function () {
        $scope.robots = $robot.query();
      };

      $scope.runTurn = function () {
        $http.post('/turn', {
          player1: $scope.robots[$scope.testRobot.index].code,
          player2: 'class Robot:\n' +
            '    def act(self, game):\n' +
            '        return [\'guard\']',
          board: $scope.selectedScenario.board,
          turn: 1
        }).success(function (data) {
          $scope.selectedScenario.board = data.turn.board;
        });
      };

      $scope.$watch('robots[testRobot.index]', function (newVal) {
        if (newVal) {
          $scope.runTurn();
        }
      });

      $scope.selectBox = function (scenario, index) {
        $scope.selectedIndex = index;
      };

      $scope.makeRed = function () {
        var box = $scope.selectedScenario.board[$scope.selectedIndex];
        box.type = 'red';
        if (!box.hp) {
          box.hp = 50;
        }
        $scope.refreshBox();
      };

      $scope.makeBlue = function () {
        var box = $scope.selectedScenario.board[$scope.selectedIndex];
        box.type = 'blue';
        if (!box.hp) {
          box.hp = 50;
        }
        $scope.refreshBox();
      };

      $scope.makeNormal = function () {
        var box = $scope.selectedScenario.board[$scope.selectedIndex];
        box.type = 'normal';
        $scope.refreshBox();
      };

      $scope.refreshBox = function () {
        $scope.selectedScenario.board[$scope.selectedIndex] =
          angular.copy($scope.selectedScenario.board[$scope.selectedIndex]);
        $scope.runTurn();
      };
    }]);
