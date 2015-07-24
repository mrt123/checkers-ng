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

        scope.pinHovers = function(startFieldNumber, x, y) {
            var hoveredField = vBoard.getApproxField(x, y);

            if (hoveredField !== null) {
                var hoveredNumber = hoveredField.number;

                removeHighlight(scope.activeSquare);
                scope.activeSquare = scope.squares[hoveredNumber-1];

                if (vBoard.isFieldLegal(startFieldNumber, hoveredNumber)) {
                    scope.activeSquare.actions.highlight();
                }
            }
        };

        // ---------- PRIVATE FUNCTIONS----START---  (privates tend to get exported to relevant Types/Services)
        function removeHighlight(square) {
            if (square) {
                square.actions.removeHighlight(); // bound to directive!
            }
        }
    }]
);



