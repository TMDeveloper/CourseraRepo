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
        narrowedList.noItems = false;
        narrowedList.found = [];
        if(narrowedList.searchTerm == undefined || narrowedList.searchTerm == ""){
            narrowedList.noItems = true;
            return;
        }
        var promise = MenuSearchService.getMatchedMenuItems(narrowedList.searchTerm);
		promise.then(function(response){
			narrowedList.found = response;
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
            for(var i=0; i< allItems.length; i++){
                if(allItems[i].description.indexOf(searchTerm.toLowerCase()) != -1 ){
                    foundItems.push(allItems[i]);
                }
            }
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
      onRemove: '&',
      noItems: '<'
    },
      controller: FoundItemsDirectiveController,
      controllerAs: "list",
      bindToController: true
  };
  return ddo;
}
    
function FoundItemsDirectiveController() {
  var list = this;
  list.noItemsInList = function() {
      if(list.noItems){
          return true;
      }
      if(list.found !== undefined){
          if(list.found.length == 0){
          return true;
          }
      }  
  };
}
    
})();