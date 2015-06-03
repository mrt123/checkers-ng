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
    function (scope, $routeParams) {

        scope.squares = getSquaresDefinition();

        // ---------- PRIVATE FUNCTIONS----START---

        function getSquaresDefinition() {
            var squares = [];

            // iterate to produce 64 squares
            for (var i = 1; i <= 64; i++) {

                // define row:
                var rowNumber = Math.ceil(i / 8);

                // define color:
                var color;
                if (rowNumber % 2 == 1) {
                    color = i % 2 == 1 ? 'white' : 'black'
                } else {
                    color = i % 2 == 1 ? 'black' : 'white'
                }

                // construct definition:
                var squareDefinition = {
                    number: i,
                    row: rowNumber,
                    color: color
                };
                squares.push(squareDefinition);
            }
            return squares;
        }
    }])
;



