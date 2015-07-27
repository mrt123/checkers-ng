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

            scope.pinHovers = function (destinationX, destinationY) {
                removeHighlight(scope.activeSquare);

                var pin = this['pin'];
                var hoveredField = vBoard.getApproxField(destinationX, destinationY);

                if (hoveredField !== null) {

                    var hoveredNumber = hoveredField.number;

                    if (vBoard.isMoveLegal(pin.field.number, hoveredNumber)) {
                        scope.activeSquare = scope.squares[hoveredNumber - 1];
                        scope.activeSquare.actions.highlight();
                    }
                }
            };

            scope.pinDrops = function (destinationX, destinationY) {
                var hoveredField = vBoard.getApproxField(destinationX, destinationY);
                var pin = this['pin'];

                if (hoveredField !== null) {
                    removeHighlight(scope.activeSquare);

                    if (vBoard.isMoveLegal(pin.field.number, hoveredField.number)) {
                        var newFieldX = hoveredField.center.x - 30;
                        var newFieldY = hoveredField.center.y - 30;

                        pin.actions.snapTo(newFieldX, newFieldY);
                        scope.pins[this.$index].field = hoveredField;  // will not affect top/left
                        pin.actions.setStartXY(newFieldX, newFieldY);
                    }
                    else {
                        returnPinToOrigin(pin, pin.field);
                    }
                }
                else {
                    returnPinToOrigin(pin, pin.field);
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



