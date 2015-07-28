angular.module('app.Pin', []).factory('Pin',
    function () {

        var Pin = function (color) {
            this.color = color;
        };

        Pin.prototype.setColor = function() {
            return this.color;
        };

        Pin.prototype.setColor = function(ficoloreld) {
            this.color = color;
        };

        return Pin;
    });