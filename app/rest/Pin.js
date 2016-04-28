var Pin = function (color, id) {
    this.color = color;
    this.id = id;
};

Pin.prototype.getColor = function () {
    return this.color;
};

module.exports = Pin;