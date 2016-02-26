/*
 * demo-app v 1.0.0a (build 20160226_114353_866)
 */

(function(window, angular, _) {
    'use strict';


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






controller('HomeCtrl', ['$scope','sessionService', function ($scope, sessionService) {

        var ctrl = this;

        ctrl.success = function(data){
            $scope.results = data;
        };

        ctrl.failure = function(){
            $scope.errorText = 'A problem occurred getting the widgets!';
        };

    sessionService.get().then(ctrl.success, ctrl.failure);
    }
]);

controller('ListCtrl', ['$scope','breweryService', function ($scope, breweryService) {

    var ctrl = this;

    function extractData(results){
        var data = [];

         _.each(results, function(result){
           data.push(_.pick(result, 'website','streetAddress', 'locality', 'region','postalCode','latitude', 'longitude', 'brewery'));
        });

        return data;
    }

    ctrl.success = function(results){
        $scope.breweries = extractData(results.data);
    };

    ctrl.failure = function(){
        $scope.errorText = 'A problem occurred getting the breweries!';
    };

    breweryService.get().then(ctrl.success, ctrl.failure);
}
]);



})(window, window.angular, window._);