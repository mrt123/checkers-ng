var Field = require('./Field.js');

var Board = function () {
    this.fields = this.generateFields();
};

Board.prototype.generateFields = function () {
    var fields = [];

    for (var i = 1; i <= 64; i++) {  // iterate to produce 64 squares
        var rowNumber = Math.ceil(i / 8);
        var column = i - ( (rowNumber - 1) * 8);
        var color = this.decideColor(rowNumber, i);
        fields.push(new Field(i, rowNumber, column, color));
    }
    return fields;
};

Board.prototype.decideColor = function (rowNo, fieldNo) {
    var oddRow = rowNo % 2 == 1;
    var oddNumber = fieldNo % 2 == 1;
    return (oddRow && !oddNumber) || (!oddRow && oddNumber) ? 'black' : 'white';
};

Board.prototype.getFieldsByColor = function (color) {
    return this.fields.filter(function (field) {
        return field.getColor() === color;
    });
};

Board.prototype.getFieldByNumber = function (number) {
    return this.fields.filter(function (field) {
        return field.id === number;
    })[0];
};

Board.prototype.getFieldAtXY = function (x, y) {
    var snapThreshold = 25;

    for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (
            this.isNumberWithin(field.center.x, x, snapThreshold) &&
            this.isNumberWithin(field.center.y, y, snapThreshold)
        ) {
            return field;
        }
    }
    return null;
};

Board.prototype.isNumberWithin = function (number, target, threshold) {
    // TODO: belongs to util class

    return Math.abs(number - target) < threshold;
};

module.exports = Board;
