var module = angular.module('gameState', []);

module.service('gameState',
    [
        '$http',
        '$q',
        function (http, $q) {
            this.store = {};

            this.isMyTurn = function () {

            };

            this.create = function (gameForm) {
                console.log('...creating Game');
                var deferred = $q.defer();

                http.post('/api/game', gameForm).then(
                    function (resp) {
                        debugger;
                        deferred.resolve(resp);
                    },
                    function (resp) {
                        deferred.resolve(resp);
                    }
                );

                return deferred.promise;
            }

        }
    ]
);