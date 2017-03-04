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
    
    narrowedList.getNarrowedList = function () {
        var promise = MenuSearchService.getMatchedMenuItems(narrowedList.searchTerm);
        promise.then(function(response){
			narrowedList.found = response;
			console.log(response);
		})
		.catch(function(error){
			console.log("Something went wrong...", error);
		});
    }
    
    narrowedList.removeItem = function (index){
        narrowedList.found.splice(index,1);
    }
    
    /*narrowedList.itemsInList = function () {
        if(narrowedList.found.length === 0 || narrowedList.searchTerm === ""){
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
            for(i=0; i< allItems.length; i++){
                if(allItems[i].description.indexOf("egg")!= -1){
                    foundItems.push(allItems[i]);
                }
            }
            console.log(foundItems);
            return foundItems;
        })
        .catch(function(error){
            console.log('Something went wrong...')
        })
        
    }
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