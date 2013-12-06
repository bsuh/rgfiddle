/*global angular*/
angular.
  module('rgfiddle.robots.match', ['directives.map']).
  controller('MatchCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.changeTurn = function (diff) {
      $scope.match.turn = Math.min(Math.max(
        parseInt($scope.match.turn, 10) + diff, 0),
                                   $scope.history.length - 1);
    };

    var _normalBox = {type: 'normal'};
    function optimizeHistory(history) {
      angular.forEach(history, function (turn) {
        for (var i = 0; i < turn.board.length; i += 1) {
          if (turn.board[i].type === 'normal') {
            turn.board[i] = _normalBox;
          }
        }
      });
      return history;
    }

    $scope.runMatch = function (index, index2) {
      $scope.statusClasses = 'fa-spinner fa-spin';

      var robot1 = $scope.robots[index];
      var robot2 = $scope.robots[index2];

      if (!robot1 || !robot2) {
        $scope.statusClasses = 'fa-warning';
        return;
      }

      $http.post('/match', {player1: robot1.code, player2: robot2.code}).
        success(function (data) {
          $scope.statusClasses = null;

          $scope.match = {
            player1: robot1.name,
            player2: robot2.name,
            turn: 0
          };
          $scope.history = optimizeHistory(data.history);
        }).error(function () {
          $scope.alerts.push({
            type: 'danger',
            msg: 'Could not run match'
          });
          $scope.statusClasses = 'fa-warning';
        });
    };
  }]);
