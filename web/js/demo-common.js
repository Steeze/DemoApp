/*
 * demo-common v 1.0.0a (build 20160226_114353_866)
 */

(function(window, angular, _) {
    'use strict';


var module = angular.module('demo-common', []),
    factory = module.factory,
    directive = module.directive,
    controller = module.controller,
    filter = module.filter,
    provider = module.provider,
    noop = angular.noop,
    forEach = angular.forEach,
    copy = angular.copy,
    isObject = angular.isObject,
    isFunction = angular.isFunction,
    isUndefined = angular.isUndefined,
    extend = angular.extend,
    lowercase = angular.lowercase,
    equals = angular.equals,
    element = angular.element,
    apiBaseUrl = window.apiConfig.baseUrl;
factory('localStorage', ['$window', function ($window){
    return $window.localStorage;
}] );
factory('navigate', ['windowLocation', '$window', function (windowLocation, $window) {
    function redirect(url) {
        windowLocation.href = url;
    }

    return {
        redirect: redirect,
        toLogin: function (returnUrl) {
            redirect('login/#/');
        }
    };
}]);
provider('noCacheInterceptor', function () {
    var self = this;

    self.$get = function() {
        return {
            request: function (config) {
                if (config.method==='GET' && config.url.indexOf(apiBaseUrl) !== -1 && !self.testMode){
                    var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                    config.url = config.url+separator+'noCache=' + new Date().getTime();
                }
                return config;
            }
        };
    };

    self.testMode = false;
});
provider('windowLocation', function () {
    var provider = {};
    provider.testMode = false;
    provider.$get = ['$window', function($window) {
        return provider.testMode ? copy($window.location) : $window.location;
    }];
    return provider;
});


})(window, window.angular, window._);