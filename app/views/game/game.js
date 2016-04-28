angular.module('app.game', [])
    .controller('GameCtrl', [
        '$scope',
        '$state',
        'gameState',
        function (scope, state, gameState) {
            state.go('user.game.board');

            if (!_dev.debug)  scope.toggleClass = 'off';


            scope.$on('debug', function (event, value) {
                if (value)  scope.toggleClass = 'on';
                if (!value)  scope.toggleClass = 'off';

            });
        }]
);



