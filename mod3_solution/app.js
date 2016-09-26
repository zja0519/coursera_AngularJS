(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownControllerFunc)
.service('MenuSearchService', MenuSearchServiceFunc)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownControllerFunc.$inject = ['MenuSearchService'];
function NarrowItDownControllerFunc(MenuSearchServiceFunc) {
  var menu = this;

  menu.sendRequest = function() {
      var promise = MenuSearchServiceFunc.getMatchedMenuItems();

      promise.then(function (response) {
        menu.items = response.data.menu_items;
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
  }

  // menu.logMenuItems = function (shortName) {
  //   var promise = MenuSearchServiceFunc.getMenuForCategory(shortName);
  //
  //   promise.then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // };

  function narrowDownItems(keyWords) {

  }
}


MenuSearchServiceFunc.$inject = ['$http', 'ApiBasePath']
function MenuSearchServiceFunc($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
      // params: {
      //   category: shortName
      // }
    });
    return response;
  };

}

})();
