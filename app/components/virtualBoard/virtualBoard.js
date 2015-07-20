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

    this.createField = function(rowNo, fieldNo){
        return {
            x: rowNo * 30,
            y: fieldNo/rowNo * 30,
            number: fieldNo
        }
    };

    this.getPlayableFields = function () {
        var playableFields = [];

        var conditions;
        for (var fieldNum = 1; fieldNum <= 64; fieldNum++) {
            var row = Math.ceil(fieldNum / 8);  // define row!

            conditions = this.getConditions(row, fieldNum);
            if (conditions.blacks) {
                playableFields.push(this.createField(row, fieldNum));
            }
        }
        return playableFields;
    };

    this.isClose = function(x1, x2,  treshold) {
       return Math.abs(x1 - x2) < treshold;
    };

    this.getField = function(x,y) {
        var snapThreshold = 10;

        var fields =  this.getPlayableFields();
        var fieldToReturn = null;

        for (var i = 0; fields.length; i++) {
            var field = fields[i];
            if (
                this.isClose(field.x, x, snapThreshold) &&
                this.isClose(field.y, y, snapThreshold)
            ) {
                return field;
            }
        }
        return fieldToReturn;
    }
});