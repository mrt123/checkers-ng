var module = angular.module('ch-square', ['ngRoute']);

// used as: "ch-square"
module.directive('chSquare', [ function () {

    return {
        restrict: 'E', //directive to be used as element only!
        // isolated scope
        scope: {
            // @ assign string representation (one way)
            // = assign actual scope model (two way)
            // & create a delegate function
            //for @var remember to use hyphen based notation on bound attributes.
            color: '@',
            playable: '@',
            number: '@',
            actionIconAction: '&',
            foods: '='
        },
        link: function (scope, element, attr) {
            element.on('mousedown', function(event) {
                // Prevent 'default' dragging of this square
                event.preventDefault();
            });

            element.on('mouseenter', function(){
                highlight(element, attr);
            });

            element.on('mouseleave', function(){
                removeHilight(element, attr);
            });

        },
        template: '<div class="{{color}}"><div class="matrix">{{number}}</div></div>'


    };

    function highlight(element, attr) {
        if (attr.playable === "true")
        element.find('.matrix').addClass("highlight");
    }

    function removeHilight(element, attr) {
        if (attr.playable === "true")
        element.find('.matrix').removeClass("highlight");
    }

}]);