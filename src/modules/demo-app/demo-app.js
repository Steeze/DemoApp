var module = angular.module('demo-app', [ 'demo-api', 'ngAnimate', 'ngRoute', 'ngMessages' ]),
    factory = module.factory,
    run = module.run,
    forEach = angular.forEach,
    copy = angular.copy,
    controller = module.controller,
    filter = _.filter,
    map = _.map,
    contains = _.contains,
    isArray = angular.isArray,
    isUndefined = angular.isUndefined,
    isString = angular.isString,
    noop = angular.noop;

module.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

       $routeProvider
            .when('/home', {
                templateUrl:'templates/demo-app/home.html',
                controller:'HomeCtrl'
            })
           .when('/list', {
               templateUrl:'templates/demo-app/list.html',
               controller:'ListCtrl'
           })
            .otherwise({
            templateUrl:'templates/demo-app/home.html',
            controller: 'HomeCtrl',
            activeNav: 'insights'
        });

}]);





