(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', BoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;
        
        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
        
        toBuyList.buyItem = function ($index) {
            ShoppingListCheckOffService.buyItem($index);
        };
    
    }
    
    BoughtController.$inject = ['ShoppingListCheckOffService'];
    
    function BoughtController(ShoppingListCheckOffService) {
        var boughtList = this;
        boughtList.items = ShoppingListCheckOffService.getBoughtItems();        
    }
    
    function ShoppingListCheckOffService() {
        var service = this, 
        boughtItems = [],
        toBuyItems = [
                {
                    name: 'Cookies',
                    quantity: 7
                },
                {
                    name: 'Apples',
                    quantity: 5
                },
                {
                    name: 'Bananas',
                    quantity: 2
                },
                {
                    name: 'Chocolate Bars',
                    quantity: 3
                },
                {
                    name: 'Bottles of Milk',
                    quantity: 2
                }
            ];
        
        service.getToBuyItems = function () {
            return toBuyItems;
        };
        
        service.buyItem = function ($index) {
            boughtItems.push(toBuyItems[$index]);  
            toBuyItems.splice($index, 1);
        };
        
        service.getBoughtItems = function () {
            return boughtItems;
        };
    }
    
})();