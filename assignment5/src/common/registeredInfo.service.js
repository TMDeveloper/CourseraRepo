(function () {
"use strict";

angular.module('common')
.service('RegisteredInfoService', RegisteredInfoService);

function RegisteredInfoService() {
  var service = this;

  service.setRegisteredInfo = function (user) {
    service.user = user;
  };

  service.getRegisteredInfo = function () {
    return service.user;
  };

}

})();
