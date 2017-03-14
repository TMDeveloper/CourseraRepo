(function () {
'use strict';

angular.module('Data')
.component('categoriesList', {
  templateUrl: 'src/MenuApp/templates/categoriesList.template.html',
  bindings: {
    categories: '<'
  }
});

})();
