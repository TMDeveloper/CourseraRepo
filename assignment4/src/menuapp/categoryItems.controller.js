(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController', CategoryItemsController);


CategoryItemsController.$inject = ['categoryItems'];
function CategoryItemsController(categoryItems) {
  var itemsForCategory = this;
  itemsForCategory.categoryItems = categoryItems;

}

})();
