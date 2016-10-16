(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryListController', CategoryListController);


CategoryListController.$inject = ['items'];
function CategoryListController(items) {
  var categoryListCtrl = this;
  categoryListCtrl.items = items;
}

})();
