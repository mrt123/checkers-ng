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
            number: '@',
            actionIconAction: '&',
            foods: '='
        },
        link: function (scope, element, attr) {
            //if(attr.number != undefined) debugger;
        },
        template: '<div class="{{color}}">{{number}}</div>'

    };
}]);