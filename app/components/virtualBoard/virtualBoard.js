angular.module('app.virtualBoard', []).factory('virtualBoard', [
    'Field',
    'Pin',
    function (Field, Pin) {

        var Board = function () {
            this.fields = this.generateFields();
            this.blackFields = this.getFieldsByColor('black');
            this.pins = this.allocatePins(this.blackFields);
        };

        Board.prototype.generateFields = function () {
            var fields = [];

            for (var i = 1; i <= 64; i++) {  // iterate to produce 64 squares
                var rowNumber = Math.ceil(i / 8);
                var column = i - ( (rowNumber - 1) * 8);
                fields.push(new Field(i, rowNumber, column));
            }
            return fields;
        };

        Board.prototype.allocatePins = function(fields) {
            var pins = [];
            fields.forEach(function(field){

                // PLAYER 1 fields
                if( field.number >= 41) {
                    var pin = new Pin('black');
                    field.setPin(pin);
                    pins.push(pin);
                }

                // PLAYER 2 fields
                if( field.number <= 24) {
                    var pin = new Pin('white');
                    field.setPin(pin);
                    pins.push(pin);
                }
            }.bind(this));
            return pins;
        };

        Board.prototype.getFieldsByColor = function (color) {
            return this.fields.filter(function (field) {
                return field.getColor() === color;
            });
        };

        Board.prototype.getFieldsWithPins = function () {
            return this.fields.filter(function (field) {
                return !field.isEmpty();
            });
        };

        Board.prototype.getFieldByNumber = function (number) {
            return this.fields.filter(function (field) {
                return field.number === number;
            });
        };

        Board.prototype.getApproxField = function (x, y) {
            var snapThreshold = 25;

            for (var i = 0; i < this.fields.length; i++) {
                var field = this.fields[i];
                if (
                    this.isClose(field.center.x, x, snapThreshold) &&
                    this.isClose(field.center.y, y, snapThreshold)
                ) {
                    return field;
                }
            }
            return null;
        };





        Board.prototype.isClose = function (number, target, threshold) {
            // TODO: belongs to util class

            return Math.abs(number - target) < threshold;
        };

        return Board;
    }]);