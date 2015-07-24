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
        scope.squares = angular.copy(game.fields);
        scope.fiedlsWithPins = game.fiedlsWithPins;
        scope.activeSquare = false;

        scope.pinHovers = function(startFieldNumber, x, y) {
            var hoveredField = vBoard.getApproxField(x, y);

            if (hoveredField !== null) {
                var hoveredNumber = hoveredField.number;

                removeHighlight(scope.activeSquare);
                scope.activeSquare = scope.squares[hoveredNumber-1];

                if (vBoard.isMoveLegal(startFieldNumber, hoveredNumber)) {
                    scope.activeSquare.actions.highlight();
                }
            }
        };        scope.activeSquare = false;

        scope.pinDrops = function(startFieldNumber, x, y) {
            var hoveredField = vBoard.getApproxField(x, y);

            if (hoveredField !== null) {
                var hoveredNumber = hoveredField.number;

                removeHighlight(scope.activeSquare);

                if (vBoard.isMoveLegal(startFieldNumber, hoveredNumber)) {
                    var x = hoveredField.center.x - 30;
                    var y = hoveredField.center.y - 30;
                    this['field'].actions.snap(x, y);
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



