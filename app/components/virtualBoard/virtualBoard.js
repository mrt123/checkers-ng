angular.module('app.virtualBoard', []).service('virtualBoard', ['Field', function (Field) {

    this.getFields = function() {
        var fields = [];

        for (var i = 1; i <= 64; i++) {  // iterate to produce 64 squares
            var rowNumber = Math.ceil(i / 8);
            var column = i - ( (rowNumber-1) * 8);
            fields.push(new Field(i, rowNumber, column));
        }
        return fields;
    };

    // TODO: belongs to util class
    this.isClose = function(x1, x2,  threshold) {
       return Math.abs(x1 - x2) < threshold;
    };

    // returns Field or null
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
}]);