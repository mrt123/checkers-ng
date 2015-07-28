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
        'Game',
        function (scope, $routeParams, Game) {

            var game = new Game();    window.game = game;
            var board = game.board;     window.scope = scope;

            // FIELDS
            scope.fields = angular.copy(game.board.fields);

            // PINS
            {
                var fieldsWithPins = board.getFieldsWithPins();
                var scopePins = [];

                fieldsWithPins.forEach(function(field, index){

                    scopePins.push({
                        color: field.getPin().color,
                        top: field.center.y,
                        left: field.center.x,
                        field: field // directive still doesn't know about the field
                    });
                });
                scope.pins = scopePins;
            }
            scope.activeSquare = false;

            scope.pinHovers = function (destinationX, destinationY) {
                removeHighlight(scope.activeSquare);

                var pinDirective = this['pin'];
                var hoveredField = board.getApproxField(destinationX, destinationY);

                if (hoveredField !== null) {

                    if (game.isMoveLegal(pinDirective.field, hoveredField)) {
                        scope.activeSquare = scope.fields[hoveredField.number - 1];
                        scope.activeSquare.actions.highlight();
                    }
                }
            };

            scope.pinDrops = function (destinationX, destinationY) {

                var hoveredField = board.getApproxField(destinationX, destinationY);
                var pinDirective = this['pin'];

                if (hoveredField !== null) {
                    removeHighlight(scope.activeSquare);

                    if (game.isMoveLegal(pinDirective.field, hoveredField)) {
                        var newFieldX = hoveredField.center.x - 30;
                        var newFieldY = hoveredField.center.y - 30;

                        pinDirective.api.leaveAt(newFieldX, newFieldY);
                        //hoveredField.setPin(pin);
                    }
                    else {
                        returnPinToOrigin(pinDirective);
                    }
                }
                else {
                    returnPinToOrigin(pinDirective);
                }
            };

            // ---------- PRIVATE FUNCTIONS----START---  (privates tend to get exported to relevant Types/Services)
            function removeHighlight(square) {
                if (square) {
                    square.actions.removeHighlight(); // bound to directive!
                    scope.activeSquare = false;  // prevent repeat deHighlight if no new highlight been made!
                }
            }

            function returnPinToOrigin(pin) {
                var fieldX = pin.field.center.x - 30;
                var fieldY = pin.field.center.y - 30;
                pin.api.animateTo(fieldX, fieldY);
            }
        }]
);



