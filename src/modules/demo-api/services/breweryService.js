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