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

            scope.pinHovers = function (field, destinationX, destinationY) {
                removeHighlight(scope.activeSquare);

                var hoveredField = vBoard.getApproxField(destinationX, destinationY);

                if (hoveredField !== null) {

                    var hoveredNumber = hoveredField.number;

                    if (vBoard.isMoveLegal(field.number, hoveredNumber)) {
                        scope.activeSquare = scope.squares[hoveredNumber - 1];
                        scope.activeSquare.actions.highlight();
                    }
                }
            };

            scope.pinDrops = function (originField, destinationX, destinationY) {
                var hoveredField = vBoard.getApproxField(destinationX, destinationY);
                var pin = this['pin'];

                if (hoveredField !== null) {
                    removeHighlight(scope.activeSquare);

                    if (vBoard.isMoveLegal(originField.number, hoveredField.number)) {
                        var fieldX = hoveredField.center.x - 30;
                        var fieldY = hoveredField.center.y - 30;
                        pin.actions.snapTo(fieldX, fieldY);
                    }
                    else {
                        returnPinToOrigin(pin, originField);
                    }
                }
                else {
                    returnPinToOrigin(pin, originField);
                }
            };

            // ---------- PRIVATE FUNCTIONS----START---  (privates tend to get exported to relevant Types/Services)
            function removeHighlight(square) {
                if (square) {
                    square.actions.removeHighlight(); // bound to directive!
                    scope.activeSquare = false;  // prevent repeat deHighlight if no new highlight been made!
                }
            }

            function returnPinToOrigin(pin, originField) {
                var fieldX = originField.center.x - 30;
                var fieldY = originField.center.y - 30;
                pin.actions.animateTo(fieldX, fieldY);
            }
        }]
);



