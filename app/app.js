var app = angular.module('app', [
    'ngRoute',
    'app.board',   // automate adding of routes & components
    'ch-square',
    'ch-draggable'
], function(){

});


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home/home.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);