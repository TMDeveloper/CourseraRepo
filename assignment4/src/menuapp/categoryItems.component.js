(function () {
'use strict';

angular.module('Data')
.component('categoryItems', {
  templateUrl: 'src/MenuApp/templates/categoryItems.template.html',
  bindings: {
    categoryItems: '<'
  }
});

})();
