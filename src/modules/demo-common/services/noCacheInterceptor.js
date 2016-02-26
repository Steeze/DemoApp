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