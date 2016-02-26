/*
 * demo-api v 1.0.0a (build 20160226_122640_860)
 */

(function(window, angular, _) {
    'use strict';


var module = angular.module('demo-api', ['ngResource']),
    factory = module.factory,
    provider = module.provider,
    extend = angular.extend,
	forEach = angular.forEach,
    apiBaseUrl = window.apiConfig.baseUrl,
    apiBaseResourceUrl = apiBaseUrl.replace(/:(?=\d+)/g, '\\:');

factory('breweryService', ['$http', function ($http) {

    function onSuccess(result){
        var data = result.data;
        return data;
    }

    return {
        get: function(){
            return $http.get(apiBaseUrl + '/api')
                .then(onSuccess);
        }
    };

}]);
factory('sessionService', ['$http', function ($http) {

    function onSuccess(result){
        var data = result.data;
        return data;
    }

    return {
        get: function(){
            return $http.get(apiBaseUrl + '/v1/sessions/')
                .then(onSuccess);
        },
        post:function(data){
            return $http.post(apiBaseUrl + '/v1/sessions/', data)
            .then(onSuccess);
        }
    };

}]);
factory('widgetService', ['$http', function ($http) {

    function onSuccess(result){
        var data = result.data;
        return data;
    }

    return {
        getWidgets: function(){
            return $http.get(apiBaseUrl + '/v1/Widgets/')
                .then(onSuccess);
        },
        getWidgetId: function(id) {
            return $http.get(apiBaseUrl + '/v1/Widgets/'+id)
                .then(function (result) {
                    return result.data;
                });
        }
    };

}]);


})(window, window.angular, window._);