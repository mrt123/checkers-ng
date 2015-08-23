angular.module('app.game', [])
    .controller('GameCtrl', [
        '$scope',
        '$state',
        function (scope, state) {
            state.go('user.game.board');

            if (!_dev.debug)  scope.toggleClass = 'off';


            scope.$on('debug', function (event, value) {
                if (value)  scope.toggleClass = 'on';
                if (!value)  scope.toggleClass = 'off';

            });
        }]
);



