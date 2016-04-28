var Field = function (number, row, column, color) {
    this.id = number;
    this.row = row;
    this.column = column;
    this.color = color;
    this.center = {
        x: this.column * 60 - 30,
        y: this.row * 60 - 30
    };
    this.legalMoves = this.getLegalMoves();
};

Field.prototype.getColor = function () {
    return this.color;
};

Field.prototype.getLegalMoves = function () {
    var legalMoves = [];
    var onLeftEdge = this.isFirstFromLeft();
    var onRightEdge = this.isFirstFromRight();

    if (this.row > 1 && this.color === 'black') {
        if (!onRightEdge) {
            legalMoves.push(this.id - 7);
        }
        if (!onLeftEdge) {
            legalMoves.push(this.id - 9);
        }
    }
    return legalMoves;
};

Field.prototype.isFirstFromRight = function () {
    return this.column % 8 === 0;
};

Field.prototype.isFirstFromLeft = function () {
    return this.column % 8 === 1;
};

module.exports = Field;