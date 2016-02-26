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
