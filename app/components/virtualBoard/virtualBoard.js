angular.module('app.virtualBoard', []).service('virtualBoard', ['Field', function (Field) {

    /**
     * virtualBoard is provided as instantiated singleton (service).
     */

    this.init = function() {
        this.fields = this.createFields();
    };

    this.createFields = function() {
        var fields = [];

        for (var i = 1; i <= 64; i++) {  // iterate to produce 64 squares
            var rowNumber = Math.ceil(i / 8);
            var column = i - ( (rowNumber-1) * 8);
            fields.push(new Field(i, rowNumber, column));
        }
        return fields;
    };

    this.getFields = function(color){
        return this.fields.filter(function (field) {
            return field.color === color;
        });
    };

    // TODO: belongs to util class
    this.isClose = function(number, target,  threshold) {
        console.log(Math.abs(number - target) < threshold)
       return Math.abs(number - target) < threshold;
    };

    // returns Field or null
    this.getApproxField = function(x,y) {
        var snapThreshold = 25;
        var fields =  this.createFields();

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

    this.isMoveLegal = function(startFieldNumber, newFieldNumber) {
        var startField = this.fields[startFieldNumber-1];
        return startField.legalMoves.indexOf(newFieldNumber) >= 0;
    };
    
    this.init();
}]);