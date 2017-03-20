(function () {
'use strict';

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService','RegisteredInfoService'];
function SignUpController(MenuService,RegisteredInfoService) {
  var $signUpCtrl = this;
  $signUpCtrl.user = {};

  $signUpCtrl.submit = function () {
    MenuService.getMenuItem($signUpCtrl.user.menuNumber.toUpperCase())
    .then(function () {
          $signUpCtrl.invalidMenuNumber = false;
          $signUpCtrl.completed = true;
          RegisteredInfoService.setRegisteredInfo($signUpCtrl.user);
          console.log(RegisteredInfoService.getRegisteredInfo());
        })
    .catch(function() {
          $signUpCtrl.invalidMenuNumber = true;
          $signUpCtrl.completed = false;
        });
  }
}

})();
