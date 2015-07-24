angular.module('app.Game', []).factory('Game', [
    'virtualBoard',
    function (board) {

        /**
         * Think of Game as a GameMaster (it owns the board, allocates pins, makes rules).
         */

        var Pin = function (field, color) {
            this.field = field;
            this.color = color;
        };

        var Game = function () {
            this.board = board;
            this.playableFields = this.board.getFields('black');
            this.pins = this.allocatePins(this.playableFields);
        };

        Game.prototype.allocatePins = function(fields) {
            var pins = [];
            fields.forEach(function(field){

                // PLAYER 1 fields
                if( field.number >= 41) {
                    var pin = new Pin(field, 'black');
                    pins.push(pin);
                }

                // PLAYER 2 fields
                if( field.number <= 24) {
                    var pin = new Pin(field, 'white');
                    pins.push(pin);
                }
            });
            return pins;
        };

        return Game;
    }]);