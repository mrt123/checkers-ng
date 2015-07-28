// https://www.youtube.com/watch?v=J6qr6Wx3VPs
angular.module('app.Field', []).factory('Field', function () {

    var Field = function(number, row, column) {
        this.number = number;
        this.row = row;
        this.column = column;
        this.color = null;
        this.setColor(this.row, number);
        this.center = {
            x : this.column * 60 - 30,
            y : this.row * 60 - 30
        };
        this.legalMoves = this.getLegalMoves();
        this.pin = null;
    };

    Field.prototype.getConditions = function(rowNo, fieldNo) {
        var oddRow = rowNo % 2 == 1;
        var eveRow = (rowNo % 2 == 0);
        var oddNumber = fieldNo % 2 == 1;
        var evenNumber = fieldNo % 2 == 0;
        return {
            blacks: (oddRow && evenNumber) || (eveRow && oddNumber),
            whites: (oddRow && oddNumber ) || (eveRow && evenNumber)
        }
    };

    Field.prototype.setColor = function(row, fieldNo) {
        var conditions = this.getConditions(row, fieldNo);
        this.color = conditions.blacks ? 'black' : 'white'
    };

    Field.prototype.getColor = function() {
        return this.color;
    };

    Field.prototype.isEmpty = function() {
        return this.pin === null;
    };

    Field.prototype.setPin = function(pin) {
        this.pin = pin;
    };

    Field.prototype.getPin = function() {
        return this.pin;
    };

    Field.prototype.getLegalMoves = function(){
        var legalMoves = [];
        var onLeftEdge = this.isFirstFromLeft();
        var onRightEdge = this.isFirstFromRight();

        if (this.row > 1 && this.color === 'black') {
            if (!onRightEdge) {
                legalMoves.push(this.number -7);
            }
            if (!onLeftEdge) {
                legalMoves.push(this.number -9);
            }
        }
        return legalMoves;
    };

    Field.prototype.isFirstFromRight= function() {
        return this.column % 8 === 0;
    };

    Field.prototype.isFirstFromLeft= function() {
        return this.column % 8 === 1;
    };

    return Field;
});