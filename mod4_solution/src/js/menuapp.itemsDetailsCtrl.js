(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsDetailsController', ItemsDetailsController);


ItemsDetailsController.$inject = ['items'];
function ItemsDetailsController(items) {
  var itemsDetails = this;
  itemsDetails.items = items;
}

})();
