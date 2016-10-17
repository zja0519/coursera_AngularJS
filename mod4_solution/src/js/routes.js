(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Premade list page
  .state('categoryPage', {
    url: '/category-page',
    templateUrl: 'src/templates/category-page.template.html',
    controller: 'CategoryListController as categoryListCtrl',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('itemsDetailsPage', {
    url: '/items-detail/{categoryId}',
    templateUrl: 'src/templates/items-details.template.html',
    controller: "ItemsDetailsController as itemsDetails",
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryId)
                .then(function (response) {
                  return response.data;
                });
            }]
    }
  });

}

})();
