(function(){
    module.factory('shoppingCart', ['localStorage', function(localStorage){

        var items = [];

        function addItemToCart(item){
          items.push(item);
        }

        function getAllItemsInCart(){
            return items;
        }

        function findItemInCart(item){
                      
        }

        function removeItemFromCart(item){
            
        }
        
        function totalPriceOfCart(){
           
        }
        
        function resetCart(){
          
        }

        return  {
            addItemToCart: addItemToCart,
            getAllItemsInCart: getAllItemsInCart,
            removeItemFromCart: removeItemFromCart,
            totalPriceOfCart: totalPriceOfCart,
            resetCart: resetCart
        };
        //return service;
    }]);
})();