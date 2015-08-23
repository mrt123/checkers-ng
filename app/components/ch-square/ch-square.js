angular.module('ch-square', []).directive('chSquare', [function () {

        return {
            restrict: 'E', //directive to be used as element only!
            // isolated scope
            scope: {
                // @ assign string representation (one way)
                // = assign actual scope model (two way) - can be used for controls
                // & create a delegate function
                //for @var remember to use hyphen based notation on bound attributes.
                color: '@',
                number: '@',
                actions: '='
            },
            link: function (scope, element, attr) {
                scope.debug = _dev.debug;
                scope.actions = {
                    highlight: highlight.bind(undefined, element),
                    removeHighlight: removeHighlight.bind(undefined, element)
                };

                element.on('mousedown', function (event) {
                    // Prevent 'default' dragging of this square
                    event.preventDefault();
                });
            },
            templateUrl: 'components/ch-square/ch-square.html'


        };

        function highlight(element) {
            element.find('.matrix').addClass("highlight");
        }

        function removeHighlight(element) {
            element.find('.matrix').removeClass("highlight");
        }

    }]);