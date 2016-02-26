provider('windowLocation', function () {
    var provider = {};
    provider.testMode = false;
    provider.$get = ['$window', function($window) {
        return provider.testMode ? copy($window.location) : $window.location;
    }];
    return provider;
});