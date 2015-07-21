var module = angular.module('app.board', ['ngRoute']);

module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/board/:gameId', {
        templateUrl: 'views/board/board.html',
        controller: 'BoardCtrl'
    });
}]);

module.controller('BoardCtrl', [
    '$scope',
    '$routeParams',
    'virtualBoard',
    function (scope, $routeParams, vBoard) {

        scope.squares = vBoard.getFields();

        scope.hover = function(x, y) {
            console.log("hover:   " +x, y);
            document.vBoard = vBoard;
            var field = vBoard.getApproxField(x, y);
            if (field !== null) {
                //var square = scope.squares[field.number];
                //square.color = 'orange';
                console.log("xyz" +field.number);
                console.log("xyz" +field.number);
            }

        };

        // ---------- PRIVATE FUNCTIONS----START---
    }])
;



