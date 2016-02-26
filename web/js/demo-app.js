/*
 * demo-app v 1.0.0a (build 20160225_215513_936)
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
            .when('home', {
                url:'/home',
                templateUrl:'templates/demo-app/home.html',
                controller:'HomeCtrl'
            })
            .otherwise({
            url:'/home',
            templateUrl:'templates/demo-app/home.html',
            controller: 'HomeCtrl',
            activeNav: 'insights'
        });

}]);






controller('HomeCtrl', ['$scope','widgetService', function ($scope, widgetService) {

        var ctrl = this;

        ctrl.getWidgetSuccess = function(results){
            $scope.widgets = results;
        };

        ctrl.getWidgetFailure = function(){
            $scope.errorText = 'A problem occurred getting the widgets!';
        };

         widgetService.getWidgets().then(ctrl.getWidgetSuccess, ctrl.getWidgetFailure);
    }
]);



})(window, window.angular, window._);