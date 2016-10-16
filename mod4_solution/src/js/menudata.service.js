(function () {
'use strict';

angular.module('Data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;
  var categoryItems=[];

  service.getAllCategories = function() {
    if(categoryItems.length === 0) {
      $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json")
      }).then(function (response) {
        // process result and only keep items that match
        var items = response.data;
        for(var i in items) {
          categoryItems.push(items[i].name);
        }
      }).catch(function (error) {
      });
    }
    return categoryItems;
    // return ["1","2","3"];
      // var response = $http({
      //     method: "GET",
      //     url: (ApiBasePath + "/categories.json")
      // });
      //
      // return response.name;
  };

  service.getItemsForCategory = function(categoryShortName) {

  };
}

})();
