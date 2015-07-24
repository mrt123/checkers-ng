angular.module('app.board', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/board/:gameId', {
            templateUrl: 'views/board/board.html',
            controller: 'BoardCtrl'
        });
    }])
    .controller('BoardCtrl', [
        '$scope',
        '$routeParams',
        'virtualBoard',
        'Game',
        function (scope, $routeParams, vBoard, Game) {

            var game = new Game();

            scope.squares = angular.copy(game.board.fields);
            scope.pins = game.pins;
            scope.activeSquare = false;

            scope.pinHovers = function (startFieldNumber, x, y) {
                var hoveredField = vBoard.getApproxField(x, y);

                if (hoveredField !== null) {
                    var hoveredNumber = hoveredField.number;

                    removeHighlight(scope.activeSquare);
                    scope.activeSquare = scope.squares[hoveredNumber - 1];

                    if (vBoard.isMoveLegal(startFieldNumber, hoveredNumber)) {
                        scope.activeSquare.actions.highlight();
                    }
                }
            };

            scope.pinDrops = function (startFieldNumber, x, y) {
                var hoveredField = vBoard.getApproxField(x, y);

                if (hoveredField !== null) {
                    var hoveredNumber = hoveredField.number;

                    removeHighlight(scope.activeSquare);

                    if (vBoard.isMoveLegal(startFieldNumber, hoveredNumber)) {
                        var fieldX = hoveredField.center.x - 30;
                        var fieldY = hoveredField.center.y - 30;
                        this['pin'].actions.snapTo(fieldX, fieldY);
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



