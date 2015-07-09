angular.module('ch-draggable', []).
    directive('chDraggable', function($document) {
        return function(scope, element, attr) {
            var startX = 0, startY = 0;
            var  cssX = 0, cssY = 0;
            element.css({
                position: 'absolute',
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'block',
                width: '60px',
                height: '60px'
                // top & left are reserved for movement
            });

            // assign event listeners on mousedown!
            element.on('mousedown', function(event) {
                // Prevent 'default' dragging of selected content
                event.preventDefault();
                startX = event.screenX - cssX;
                startY = event.screenY - cssY;
                $document.on('mousemove', mouseMove);
                $document.on('mouseup', mouseup);
            });

            function mouseMove(event) {
                // update css values to match relative to container.
                cssX = event.screenX - startX;
                cssY = event.screenY - startY;

                element.css({
                    top: cssY + 'px',
                    left:  cssX + 'px'
                });

                logMovement(event);
            }

            // de-register event listeners!
            function mouseup() {
                $document.off('mousemove', mouseMove);
                $document.off('mouseup', mouseup);
            }

            function logMovement(){
                //console.log("css top:" + element.css("top"));
                //console.log("css left:" + element.css("left"));
                //
                //console.log("screenX:" + event.screenX);
                //console.log("screenY:" + event.screenY);
                //console.log(getCenterXY());
            }

            function getCenterXY(){
                return {
                    x: element.css("top")+30,
                    y: element.css("left")+30
                }
            }

        };
    });