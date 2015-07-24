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

        scope.draggableHovers = function(fieldNumber, x, y) {
            console.log("hover:   " +x, y, fieldNumber);
            document.vBoard = vBoard;
            var hoveredField = vBoard.getApproxField(x, y);
            if (hoveredField !== null) {
                //var square = scope.squares[field.number];
                //square.color = 'orange';
                console.log("xyz" +hoveredField.number);
                console.log("xyz" +hoveredField.number);
            }

        };

        // ---------- PRIVATE FUNCTIONS----START---
    }]
);



