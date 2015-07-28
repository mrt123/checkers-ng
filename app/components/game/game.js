angular.module('app.Game', []).factory('Game', [
    'virtualBoard',
    function (Board) {

        /**
         * Think of Game as a GameMaster :
         *  - it owns the board
         *  - makes rules).
         *  - does not allocates pins (board comes with pins pre allocated)
         */

        var Game = function () {
            this.board = new Board;
        };

        Game.prototype.isMoveLegal = function(startField, newField) {
            //var startField = this.board.fields[startFieldNumber-1];
            //var newField = this.board.fields[newFieldNumber-1];
            var condition1 = startField.legalMoves.indexOf(newField.number) >= 0;
            var condition2 = newField.isEmpty();
            return condition1 && condition2;
        };

        return Game;
    }]);