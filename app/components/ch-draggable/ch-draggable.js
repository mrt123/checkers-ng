angular.module('ch-draggable', []).
    directive('chDraggable', function($document) {


        return {
            restrict: 'E', //directive to be used as element only!
            // isolated scope
            scope: {
                // @ assign string representation (one way)
                // = assign actual scope model (two way)
                // & create a delegate function
                // for @var remember to use hyphen based notation on bound attributes.
                reportDrag: '&onDrag',
                fieldnumber: '@fieldnumber'
            },
            link: function (scope, element, attr) {

                var startX =  0, startY = 0;
                var  cssX = attr.left -30 || 0, cssY = attr.top -30 || 0;
                element.css({
                    top: cssY + 'px',
                    left:  cssX + 'px'
                });

                // assign event listeners on mousedown!
                element.on('mousedown', function(event) {
                    // Prevent 'default' dragging of selected content
                    event.preventDefault();
                    startX = event.screenX - cssX;
                    startY = event.screenY - cssY;
                    $document.on('mousemove', mouseMove);
                    $document.on('mouseup', mouseup);
                    element.addClass('active');
                });

                function mouseMove(event) {
                    // update css values to match relative to container.
                    cssX = event.screenX - startX;
                    cssY = event.screenY - startY;

                    element.css({
                        top: cssY + 'px',
                        left:  cssX + 'px'
                    });


                    scope.reportDrag({  // reports centered coordinates!
                        fieldNumber: attr.fieldnumber,
                        x: cssX+30,
                        y: cssY+30
                    });
                    //logMovement(event);
                }

                // de-register event listeners!
                function mouseup() {
                    $document.off('mousemove', mouseMove);
                    $document.off('mouseup', mouseup);
                    element.removeClass('active');
                }

                function logMovement(){
                    //console.log("css top:" + element.css("top"));
                    //console.log("css left:" + element.css("left"));
                    //
                    //console.log("screenX:" + event.screenX);
                    //console.log("screenY:" + event.screenY);
                    console.log(getCenterXY());
                }

                function getCenterXY(){
                    return {
                        x: parseInt(element.css("top")) + 30,
                        y: parseInt(element.css("left")) + 30
                    }
                }
            }
        };
    });