describe('demo-app shoppingCart', function () {
    var localStorage, shoppingCart;

    beforeEach(function () {
        module('demo-app');

        inject(function (_shoppingCart_, _localStorage_) {
            localStorage = _localStorage_;
            shoppingCart = _shoppingCart_;
        });
    });

    describe('When a item is added to a shopping cart', function () {
        beforeEach(function () {
            var cartItem = {
                'id': 1,
                'name': 'fooItem',
                'description': 'barDesc',
                'price': 10,
                'qty': 1
            };
            shoppingCart.addItemToCart(cartItem);
        });

        it('should have one item in the cart', function () {
            expect(shoppingCart.getAllItemsInCart().length).toEqual(1);
        });
    });

    describe('When a two of the same items are added to a shopping cart', function () {
        beforeEach(function () {
            var firstCartItem = {
                'id': 1,
                'name': 'fooItemOne',
                'description': 'barDescOne',
                'price': 10,
                'qty': 1
            };
            var secondCartItem = {
                'id': 1,
                'name': 'fooItemOne',
                'description': 'barDescOne',
                'price': 10,
                'qty': 2
            };
            shoppingCart.addItemToCart(firstCartItem);
            shoppingCart.addItemToCart(secondCartItem);
        });

        it('should have one item in the cart', function () {
            expect(shoppingCart.getAllItemsInCart().length).toEqual(1);
        });

        it('should increase the quantity when the same item is added', function () {
            expect(shoppingCart.getAllItemsInCart()[0].qty).toEqual(3);
        });
    });

    describe('When one item is added to the shopping cart then removed', function () {
        beforeEach(function () {
            var cartItem = {
                'id': 1,
                'name': 'fooItem',
                'description': 'barDesc',
                'price': 10,
                'qty': 1
            };
            shoppingCart.addItemToCart(cartItem);
            shoppingCart.removeItemFromCart(cartItem);
        });

        it('the shopping cart should be empty', function () {
            expect(shoppingCart.getAllItemsInCart().length).toEqual(0);
        });
    });

    describe('When two items are added to a shopping cart', function () {
        beforeEach(function () {
            var firstCartItem = {
                'id': 1,
                'name': 'fooItemOne',
                'description': 'barDescOne',
                'price': 10,
                'qty': 1
            };
            var secondCartItem = {
                'id': 2,
                'name': 'fooItemTwo',
                'description': 'barDescTwo',
                'price': 20,
                'qty': 2
            };
            shoppingCart.addItemToCart(firstCartItem);
            shoppingCart.addItemToCart(secondCartItem);
        });

        it('should expect the total to be calculated', function () {
            expect(shoppingCart.totalPriceOfCart()).toEqual(50);
        });
    });

    describe('When a shopping cart has items added', function () {
        beforeEach(function () {
            var firstCartItem = {
                'id': 1,
                'name': 'zzzItem',
                'description': 'barDescOne',
                'price': 10,
                'qty': 1
            };
            var secondCartItem = {
                'id': 2,
                'name': 'aaaItem',
                'description': 'barDescTwo',
                'price': 20,
                'qty': 2
            };

            var thirdCartItem = {
                'id': 3,
                'name': 'fffItem',
                'description': 'barDescThree',
                'price': 30,
                'qty': 5
            };

            shoppingCart.addItemToCart(firstCartItem);
            shoppingCart.addItemToCart(secondCartItem);
            shoppingCart.addItemToCart(thirdCartItem);
        });

        it('should return the items in alphabetical order by name', function () {
            expect(shoppingCart.getAllItemsInCart()[0].name).toEqual('aaaItem');
        });
    });

    //Next Unit Test.
    describe('When a shopping cart is reset', function () {
        beforeEach(function () {
            var firstCartItem = {
                'id': 1,
                'name': 'zzzItem',
                'description': 'barDescOne',
                'price': 10,
                'qty': 1
            };
            shoppingCart.addItemToCart(firstCartItem);
            shoppingCart.resetCart();
        })

        it('should be empty', function () {
            expect(shoppingCart.getAllItemsInCart().length).toEqual(0);
        })

    });


});