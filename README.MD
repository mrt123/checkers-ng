NOTE TO SELF:
* board consists of a single div
** fields are virtual
** pieces move inside the board constrained by fields
** squares serve as backdrop

NEXT TODO:
* virtual board module
* implement "time since last reloaded" counter for browserSync
* figure out how to reload browser on serve start


PROBLEM:
* draggable is aware of its position
* field is not aware draggable is hovering over it

SOLUTION:
* as part of draggable interface : provide callback
** executed in owning controller (Board)
** eg: dragAction
A
** Sudo code:
dragAction = function(x,y) {
    Int fieldHovered = vBoard.getField(x,y);




}