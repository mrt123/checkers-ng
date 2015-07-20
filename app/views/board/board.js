var module = angular.module('app.board', ['ngRoute']);

module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/board/:gameId', {
        templateUrl: 'views/board/board.html',
        controller: 'BoardCtrl'
    });
}]);

module.controller('BoardCtrl', [
    '$scope',
    '$routeParams',
    'virtualBoard',
    function (scope, $routeParams, vBoard) {

        scope.squares = getSquaresDefinition();

        // ---------- PRIVATE FUNCTIONS----START---

        function getSquaresDefinition() {
            var squares = [];
            var conditions;

            for (var i = 1; i <= 64; i++) {  // iterate to produce 64 squares

                var rowNumber = Math.ceil(i / 8);  // define row:
                conditions = vBoard.getConditions(rowNumber, i);

                // define color:
                var color;
                if (conditions.blacks) {
                    color = 'black';
                }
                else {
                    color = 'white';
                }

                // construct definition:
                var squareDefinition = {
                    number: i,
                    row: rowNumber,
                    color: color,
                    playable: color === 'black'
                };


                squares.push(squareDefinition);
            }
            return squares;
        }
    }])
;



