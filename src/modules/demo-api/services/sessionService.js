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