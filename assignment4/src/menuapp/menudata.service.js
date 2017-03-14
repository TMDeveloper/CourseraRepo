(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;
  service.getAllCategories = function () {
    return $http({
            method: 'GET',
            url: (ApiBasePath + "/categories.json")
        })
        .then(function (result) {
           var allCategories = result.data;
            console.log(allCategories);
            return allCategories;
        })
        .catch(function(error){
            console.log('Something went wrong...')
        })
        
  };
  service.getItemsForCategory = function (categoryShortName) {
    return $http({
            method: 'GET',
            url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
        })
        .then(function (result) {
           var categoryItems = result.data.menu_items;
            console.log(categoryItems);
            return categoryItems;
        })
        .catch(function(error){
            console.log('Something went wrong...')
        }) 
  };
}

})();
