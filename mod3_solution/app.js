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
      onRemove: '&',
      myTitle: '@title'
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
  menu.resultHolder = MenuSearchServiceFunc.getResultHolder();
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
  var result = {
    msg:""
  };
  service.getMatchedMenuItems = function (searchTerm) {
    if(foundItems.length>0) foundItems.splice(0,foundItems.length);
    if(searchTerm === undefined || searchTerm.length === 0) result.msg = "Nothing found";
    else {
      result.msg = "Loading...";
      $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
      }).then(function (response) {
        // process result and only keep items that match
        var items = response.data.menu_items;
        for(var i in items) {
          if(items[i].description!==undefined && items[i].description!=="" && items[i].description.indexOf(searchTerm)!==-1)foundItems.push(items[i]);
        }
        if(foundItems.length===0) result.msg = "Nothing found";
        else result.msg = "Narrowed list"+"("+String(foundItems.length)+" item(s))";
        // console.log(service.foundItems);
      }).catch(function (error) {
        result.msg = "Failed to retrieve data."
      });
   }
  };

  service.getFoundItems = function() {
    //console.log(foundItems);
    return foundItems;
  };

  service.removeItem = function(index) {
    foundItems.splice(index, 1);
    result.msg = "Narrowed list"+"("+String(foundItems.length)+" item(s))";
  };

  service.getResultHolder = function() {
    return result;
  }
}

})();
