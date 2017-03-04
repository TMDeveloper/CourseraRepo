(function () {
'use strict';
    
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
NarrowItDownController.$inject = ['MenuSearchService'];
    
function NarrowItDownController(MenuSearchService) {
    var narrowedList = this;
    
    narrowedList.getFoundItems = function (){
        narrowedList.found = MenuSearchService.getMatchedMenuItems(narrowedList.searchTerm);
    };
    
    narrowedList.removeItem = function (index){
        narrowedList.found.splice(index,1);
    };
    
    /*narrowedList.itemsInList = function () {
        if(narrowedList.found.length == 0 || narrowedList.searchTerm ==""){
            return true;
        }
    };*/

}
    
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];
    
    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: 'GET',
            url: (ApiBasePath + "/menu_items.json")
        })
        .then(function (result) {
           var allItems = result.data.menu_items;
            console.log(allItems.length);
            for(var i=0; i< allItems.length; i++){
                if(allItems[i].description.indexOf(searchTerm.toLowerCase()) != -1 ){
                    foundItems.push(allItems[i]);
                }
            }
            console.log(foundItems.length);
            return foundItems;
        })
        .catch(function(error){
            console.log('Something went wrong...')
        })
        
    };
}
    
function foundItemsDirective () {
   var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}
    
})();