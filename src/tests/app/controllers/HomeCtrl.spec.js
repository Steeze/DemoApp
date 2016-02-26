describe('demo-app HomeCtrl', function(){
   var $scope,
       homeCtrl,
       widgetService,
       widgetServiceResult;

    beforeEach(function(){
        module('demo-app');

        inject(function($rootScope, $controller, _widgetService_){

            $scope = $rootScope.$new();

            widgetServiceResult = {
                id:1,
                name:'widgetOne',
                description:'widgetOneDescription'
            };

            widgetService = _widgetService_;

            spyOn(widgetService, 'getWidgets').and.callThrough();

            homeCtrl = $controller('HomeCtrl', {
                $scope: $scope,
                widgetService : widgetService
            });

        });
    });

    describe('Immediately on construction', function(){

        xit('HomeCtrl should be truthy', function(){
            expect(homeCtrl).toBeTruthy();
        });

        xit('should call the widget service', function(){
            expect(widgetService.getWidgets).toHaveBeenCalled();
        });
    });
    describe('loadSuccess()', function(){
        beforeEach(function () {
           homeCtrl.getWidgetSuccess(widgetServiceResult);
        });

        xit('should set widgets', function(){
            expect($scope.widgets).toBe(widgetServiceResult);
        });
    });
    describe('loadFailure()', function(){
        beforeEach(function(){
           homeCtrl.getWidgetFailure();
        });
        xit('should set error text', function(){
           expect($scope.errorText).toBeTruthy();
        });
    })

});