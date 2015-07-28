angular.module('ch-pin', []).
    directive('chPin', function ($document) {

        return {
            restrict: 'E', //directive to be used as element only!
            // isolated scope
            scope: {
                // @ assign string representation (one way)
                // = assign actual scope model (two way)
                // & create a delegate function
                // for @var remember to use hyphen based notation on bound attributes.
                reportDrag: '&onDrag',
                reportDrop: '&onDrop',
                field: '=field',  // need up to date field!
                actions: '='
            },
            link: function (scope, element, attr) {

                scope.actions = {
                    snapTo: moveToXY.bind(undefined, element),
                    animateTo: animateTo.bind(undefined, element),
                    setStart: setStart
                };

                var startX, startY, markX, markY, newX, newY;
                startX = attr.left - 30;
                startY = attr.top - 30;
                setStart(startX, startY);
                moveToXY(element, startX, startY);
                element.on('mousedown', mouseDown);

                function setStart(x, y) {
                    startX = x;
                    startY = y;
                }

                function mouseDown(event) {
                    event.preventDefault();     // Prevent 'default' browser highlight of selected content

                    markX = event.pageX;
                    markY = event.pageY;

                    $document.on('mousemove', mouseMove);
                    $document.on('mouseup', mouseUp);
                    element.addClass('active');
                }

                function mouseMove(event) {
                    // update css values to match relative to container.
                    var differenceX = event.pageX - markX;
                    var differenceY = event.pageY - markY;
                    newX = startX + differenceX;
                    newY = startY + differenceY;
                    moveToXY(element, newX, newY);

                    scope.reportDrag({  // reports centered coordinates!
                        x: newX + 30,
                        y: newY + 30
                    });
                }

                function mouseUp() {
                    scope.reportDrop({
                        x: newX + 30,
                        y: newY + 30
                    });

                    // de-register event listeners!
                    $document.off('mousemove', mouseMove);
                    $document.off('mouseup', mouseUp);
                    element.removeClass('active');
                }

                function logMovement() {
                    console.log(getCenterXY());
                }

                function getCenterXY() {
                    return {
                        x: parseInt(element.css("top")) + 30,
                        y: parseInt(element.css("left")) + 30
                    }
                }

                function moveToXY(element, x, y) {
                    element.css({
                        left: x + 'px',
                        top: y + 'px'
                    });
                }

                function animateTo(element, x, y) {
                    element.animate({
                        left: x + 'px',
                        top: y + 'px'
                    }, 500, function () {
                        // Animation complete.
                    });
                }
            }
        };
    });