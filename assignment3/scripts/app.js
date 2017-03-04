(function () {
'use strict';
    
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
NarrowItDownController.$inject = ['MenuSearchService'];
    
function NarrowItDownController(MenuSearchService) {
    var narrowedList = this;
    
    narrowedList.getFoundItems = function (){
        var promise = MenuSearchService.getMatchedMenuItems(narrowedList.searchTerm);
		promise.then(function(response){
			narrowedList.found = response;
            narrowedList.noItemsInList = function () {
            if(narrowedList.found == undefined || narrowedList.found.length == 0){
                return true;
            }
        };
            console.log(narrowedList.found);
		})
		.catch(function(error){
			console.log("Something went wrong...", error);
		});
    };
    
    narrowedList.removeItem = function (index){
        narrowedList.found.splice(index,1);
    }; 
}
        
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];
    
    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            restrict: 'E',
            method: 'GET',
            url: (ApiBasePath + "/menu_items.json")
        })
        .then(function (result) {
           var allItems = result.data.menu_items;
            foundItems = [];
            console.log("All items are: " + allItems.length);
            for(var i=0; i< allItems.length; i++){
                if(allItems[i].description.indexOf(searchTerm.toLowerCase()) != -1 ){
                    foundItems.push(allItems[i]);
                }
            }
            console.log("Item found with search " +foundItems.length);
            return foundItems;
        })
        .catch(function(error){
            console.log('Something went wrong...')
        })
        
    };
}
    
function FoundItemsDirective () {
   var ddo = {
    restrict: 'E',
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
      controller: FoundItemsDirectiveController,
      controllerAs: "list",
      bindToController: true
  };
  return ddo;
}
    
function FoundItemsDirectiveController() {
  var list = this;
}
    
})();