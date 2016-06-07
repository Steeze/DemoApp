(function () {
    module.factory('shoppingCart', ['localStorage', function (localStorage) {

        var items = [];

        function addItemToCart(item) {

        }

        function getAllItemsInCart() {

        }

        function removeItemFromCart(item) {

        }

        function totalPriceOfCart() {

        }

        function resetCart() {

        }

        return {
            addItemToCart: addItemToCart,
            getAllItemsInCart: getAllItemsInCart,
            removeItemFromCart: removeItemFromCart,
            totalPriceOfCart: totalPriceOfCart,
            resetCart: resetCart
        };

    }]);
})();