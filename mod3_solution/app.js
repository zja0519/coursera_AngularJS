(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownControllerFunc)
.service('MenuSearchService', MenuSearchServiceFunc)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownControllerFunc.$inject = ['MenuSearchService'];
function NarrowItDownControllerFunc(MenuSearchServiceFunc) {
  var menu = this;
  menu.items = MenuSearchServiceFunc.getFoundItems();
  menu.sendRequest = function() {
      MenuSearchServiceFunc.getMatchedMenuItems(menu.searchTerm);
  };
}


MenuSearchServiceFunc.$inject = ['$http', 'ApiBasePath']
function MenuSearchServiceFunc($http, ApiBasePath) {
  var service = this;
  var foundItems=[];
  service.getMatchedMenuItems = function (searchTerm) {
    $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (response) {
      // process result and only keep items that match
      var items = response.data.menu_items;
      if(foundItems.length>0) foundItems.splice(0,foundItems.length);
      for(var i in items) {
        if(items[i].description!==null && items[i].description!=="" && items[i].description.indexOf(searchTerm)!==-1)foundItems.push(items[i]);
      }
      // console.log(service.foundItems);
    });
  };

  service.getFoundItems = function() {
    console.log(foundItems);
    return foundItems;
  };
}

})();
