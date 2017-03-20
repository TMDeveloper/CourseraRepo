(function () {
'use strict';

angular.module('public')
.controller('RegisteredInfoController', RegisteredInfoController);

RegisteredInfoController.$inject = ['MenuService','registeredInfo'];
function RegisteredInfoController(MenuService,registeredInfo) {
  var $regInfoCtrl = this;

 if (registeredInfo) {
   $regInfoCtrl.user = registeredInfo;
   MenuService.getMenuItem($regInfoCtrl.user.menuNumber)
     .then(function(response) {
       $regInfoCtrl.menuItem = response;
     })
     .catch(function(response) {
       console.log(response);
     });
 }
}

})();
