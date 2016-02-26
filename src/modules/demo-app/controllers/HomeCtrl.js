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
