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
                fieldnumber: '@fieldnumber',
                actions: '='
            },
            link: function (scope, element, attr) {

                scope.actions = {
                    snapTo: moveToXY.bind(undefined, element)
                };

                var startX = 0, startY = 0;
                var cssX = attr.left - 30 || 0, cssY = attr.top - 30 || 0;
                moveToXY(element, cssX, cssY);

                // assign event listeners on mousedown!
                element.on('mousedown', function (event) {
                    // Prevent 'default' dragging of selected content
                    event.preventDefault();
                    startX = event.screenX - cssX;
                    startY = event.screenY - cssY;
                    $document.on('mousemove', mouseMove);
                    $document.on('mouseup', mouseUp);
                    element.addClass('active');
                });

                function initPosition() {
                    // TODO parametrize mouseMove and move init stuff here!
                }

                function mouseMove(event) {
                    // update css values to match relative to container.
                    cssX = event.screenX - startX;
                    cssY = event.screenY - startY;
                    moveToXY(element, cssX, cssY);

                    scope.reportDrag({  // reports centered coordinates!
                        fieldNumber: attr.fieldnumber,
                        x: cssX + 30,
                        y: cssY + 30
                    });
                }

                function mouseUp() {
                    scope.reportDrop({
                        fieldNumber: attr.fieldnumber,
                        x: cssX + 30,
                        y: cssY + 30
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
            }
        };
    });