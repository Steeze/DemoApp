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