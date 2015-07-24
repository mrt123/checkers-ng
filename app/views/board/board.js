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
    'Game',
    function (scope, $routeParams, vBoard, Game) {

        var game = new Game();
        scope.squares = game.fields;
        scope.fiedlsWithPins = game.fiedlsWithPins;
        scope.activeSquare = false;

        scope.draggableHovers = function(startFieldNumber, x, y) {
            document.vBoard = vBoard;
            var hoveredField = vBoard.getApproxField(x, y);
            if (hoveredField !== null) {
                if (scope.activeSquare) {
                    scope.activeSquare.actions.removeHighlight();
                }
                scope.activeSquare = scope.squares[hoveredField.number-1];

                if (isActiveSquareLegal(startFieldNumber, hoveredField.number)) {
                    scope.activeSquare.actions.highlight();
                }
                console.log("hovering over: " + hoveredField.number);
            }

        };

        // ---------- PRIVATE FUNCTIONS----START---
        var isActiveSquareLegal = function(startFieldNumber, newFieldNumber) {
            var startSquare = scope.squares[startFieldNumber-1];
            return startSquare.legalMoves.indexOf(newFieldNumber) >= 0;
        };
    }]
);



