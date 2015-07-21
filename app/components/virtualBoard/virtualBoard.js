angular.module('app.virtualBoard', []).service('virtualBoard', function () {

    this.getConditions = function(rowNo, fieldNo) {

        var oddRows = rowNo % 2 == 1;
        var eveRows = (rowNo % 2 == 0);
        var oddFields = fieldNo % 2 == 1;
        var evenFields = fieldNo % 2 == 0;

        return {
            blacks: (oddRows && evenFields) || (eveRows && oddFields),
            whites: (oddRows && oddFields ) || (eveRows && evenFields)
        }
    };

    this.getColor = function(row, fieldNo) {
        var conditions = this.getConditions(row, fieldNo);
        return conditions.blacks ? 'black' : 'white'
    };

    this.getFields = function() {
        var fields = [];

        for (var i = 1; i <= 64; i++) {  // iterate to produce 64 squares
            var rowNumber = Math.ceil(i / 8);
            var column = i - ( (rowNumber-1) * 8);
            var color = this.getColor(rowNumber, i);
            var x = column * 60 - 30;
            var y = rowNumber * 60 - 30;
            var field = {
                number: i,
                column: column,
                row: rowNumber,
                color: color,
                center: {
                    x: x,
                    y: y
                }
            };
            field.legalMoves = this.getLegalMoves(field);
            fields.push(field);
        }
        return fields;
    };

    this.getLegalMoves = function(field) {
        var legalMoves = [];
        var onLeftEdge = this.isFirstFromLeft(field);
        var onRightEdge = this.isFirstFromRight(field);

        if (field.row > 1 && field.color === 'black') {
            if (!onRightEdge) {
                legalMoves.push(field.number -7);
            }
            if (!onLeftEdge) {
                legalMoves.push(field.number -9);
            }
        }
        return legalMoves;
    };

    this.isFirstFromRight= function(field) {
        return field.column % 8 === 0;
    };

    this.isFirstFromLeft= function(field) {
        return field.column % 8 === 1;
    };

    this.isClose = function(x1, x2,  threshold) {
       return Math.abs(x1 - x2) < threshold;
    };

    this.getApproxField = function(x,y) {
        var snapThreshold = 10;
        var fields =  this.getFields();

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (
                this.isClose(field.center.x, x, snapThreshold) &&
                this.isClose(field.center.y, y, snapThreshold)
            ) {
                return field;
            }
        }
        return null;
    };
});