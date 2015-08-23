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

            // Scope Fields
            scope.fields = game.board.fields;

            // Scope Pins
            {
                var scopePins = [];
                game.pinMap.forEach(function(mapping){
                    var field = board.getFieldByNumber(mapping.fieldId);
                    var pin = game.getPinById(mapping.pinId);

                    scopePins.push({
                        color: pin.getColor(),
                        id: pin.id,
                        top: field.center.y,
                        left: field.center.x
                    });
                });
                scope.pins = scopePins;  // used to generate pin directive
            }
            scope.activeSquare = undefined;

            scope.pinHovers = function (destinationX, destinationY) {
                removeHighlight(scope.activeSquare);

                var pinDirective = this['pin'];
                var sourceField = game.getFieldMappedToPin(pinDirective.id);
                var targetField = board.getFieldAtXY(destinationX, destinationY);

                if (targetField !== null) {

                    if (game.isMoveLegal(sourceField, targetField)) {
                        scope.activeSquare = scope.fields[targetField.number - 1];
                        scope.activeSquare.actions.highlight();
                    }
                }
            };

            scope.pinDrops = function (destinationX, destinationY) {
                var pinDirective = this['pin'];
                var sourceField = game.getFieldMappedToPin(pinDirective.id);
                var targetField = board.getFieldAtXY(destinationX, destinationY);

                if (targetField !== null) {
                    removeHighlight(scope.activeSquare);

                    if (game.isMoveLegal(sourceField, targetField)) { // drop the Pin
                        var newFieldX = targetField.center.x - 30;
                        var newFieldY = targetField.center.y - 30;

                        //  show dropping of the Pin
                        pinDirective.api.leaveAt(newFieldX, newFieldY);

                        // update game
                        game.updateMapping(pinDirective.id, targetField.number)
                    }
                    else {
                        returnPinToField(pinDirective, sourceField);
                    }
                }
                else {
                    returnPinToField(pinDirective, sourceField);
                }
            };

            // ---------- PRIVATE FUNCTIONS----START---  (privates tend to get exported to relevant Types/Services)
            function removeHighlight(square) {
                if (square  !== undefined) {
                    square.actions.removeHighlight(); // bound to directive!
                    scope.activeSquare = undefined;  // prevent repeat deHighlight if no new highlight been made!
                }
            }

            function returnPinToField(pin, field) {
                var fieldX = field.center.x - 30;
                var fieldY = field.center.y - 30;
                pin.api.animateTo(fieldX, fieldY);
            }
        }]
);



