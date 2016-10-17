(function () {
'use strict';

angular.module('Data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    // if(categoryItems.length === 0) {
    //   $http({
    //       method: "GET",
    //       url: (ApiBasePath + "/categories.json")
    //   }).then(function (response) {
    //     // process result and only keep items that match
    //     var items = response.data;
    //     for(var i in items) {
    //       categoryItems.push(items[i].name);
    //     }
    //   }).catch(function (error) {
    //   });
    //   return
    // }
    // return categoryItems;
    // return ["1","2","3"];
      return $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json")
      }).then(function (response) {
        // process result and only keep items that match
        // var items = response.data;
        // var categoryItems=[];
        // for(var i in items) {
        //   categoryItems.push(items[i].name);
        // }
        return response.data;
      }).catch(function (error) {
      });
  };

  service.getItemsForCategory = function(categoryShortName) {

  };
}

})();
