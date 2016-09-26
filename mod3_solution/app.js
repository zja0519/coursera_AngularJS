(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownControllerFunc)
.service('MenuSearchService', MenuSearchServiceFunc)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItem: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {

}

NarrowItDownControllerFunc.$inject = ['MenuSearchService'];
function NarrowItDownControllerFunc(MenuSearchServiceFunc) {
  var menu = this;
  menu.items = MenuSearchServiceFunc.getFoundItems();
  menu.sendRequest = function() {
      MenuSearchServiceFunc.getMatchedMenuItems(menu.searchTerm);
  };

  menu.removeItem = function(index) {
      MenuSearchServiceFunc.removeItem(index);
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
    //console.log(foundItems);
    return foundItems;
  };

  service.removeItem = function(index) {
    foundItems.splice(index, 1);
  };
}

})();
