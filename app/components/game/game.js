angular.module('app.Game', []).factory('Game', [
    'virtualBoard',
    function (vBoard) {


        var Pin = function (fieldNumber, color) {
            this.fieldNumber = fieldNumber;
            this.color = color;
        };

        var Game = function () {
            this.fields = vBoard.createFields();
            this.playableFields = vBoard.getFields('black');
            this.fiedlsWithPins = this.populateFields(this.playableFields);
        };

        Game.prototype.populateFields = function(fields) {
            var fieldsWithPins = [];
            fields.filter(function(field){  // cheat to iterate array!

                // PLAYER 1 fields
                if( field.number >= 41) {
                    field.pin = new Pin(field.number, 'black');
                    fieldsWithPins.push(field);
                }

                // PLAYER 2 fields
                if( field.number <= 24) {
                    field.pin = new Pin(field.number, 'white');
                    fieldsWithPins.push(field);
                }
            });
            return fieldsWithPins;
        };

        return Game;
    }]);