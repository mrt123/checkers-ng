angular.module('app.index', [])
    .controller('IndexCtrl', [
        '$scope',
        '$q',
        'gameState',
        function (scope, $q, gameState) {


            scope.gameForm = {
                player1: {
                    name: 'Joe'
                },
                player2: {
                    name: 'Jill'
                }
            };

            scope.createGame = function(gameForm) {
                gameState.create(gameForm).then(function(gameData) {
                    afterGameCreate(gameData);
                });

            };


            function afterGameCreate(gameData) {
                console.log('after game creation ... ');

                console.log(JSON.stringify(gameData, null, 4))
            }
        }]
);



