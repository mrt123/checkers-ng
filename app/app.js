var app = angular.module('app', ['gulp-angular-modules']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home/home.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);