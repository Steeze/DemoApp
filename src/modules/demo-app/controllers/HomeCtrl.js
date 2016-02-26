controller('HomeCtrl', ['$scope','sessionService', function ($scope, sessionService) {

        var ctrl = this;

        $scope.addSession = function(valid){
            if(!valid){
                return;
            }
            var data = {
                Name : $scope.session.name,
                Abstract : $scope.session.abstract
            };
            sessionService.post(data).then(ctrl.addSuccess, ctrl.addFailure);
        };

        ctrl.addSuccess = function(){

        };

        ctrl.addFailure = function(){
            $scope.errorText = 'A problem saving your session!';
        };

        ctrl.success = function(data){
            $scope.results = data;
        };

        ctrl.failure = function(){
            $scope.errorText = 'A problem occurred getting the sessions!';
        };

    sessionService.get().then(ctrl.success, ctrl.failure);
    }
]);
