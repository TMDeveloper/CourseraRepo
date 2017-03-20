(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.registeredInfo', {
      url: '/registeredInfo',
      templateUrl: 'src/public/registeredInfo/registeredInfo.html',
      controller: 'RegisteredInfoController',
      controllerAs: 'regInfoCtrl',
      resolve: {
        registeredInfo: ['RegisteredInfoService', function (RegisteredInfoService) {
          return RegisteredInfoService.getRegisteredInfo();
        }]
      }
    })
    .state('public.signUp', {
      url: '/signUp',
      templateUrl: 'src/public/signUp/signUp.html',
      controller: 'SignUpController',
      controllerAs: 'signUpCtrl',
    });
}
})();
