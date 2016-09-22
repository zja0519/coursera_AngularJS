(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingControllerFunc)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingControllerFunc)
.service('ShoppingListCheckOffService', ShoppingListCheckOffServiceFunc);

ToBuyShoppingControllerFunc.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingControllerFunc(ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();
  toBuyCtrl.buyItem = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };
  //toBuyCtrl.toBuyListIsEmpty = ShoppingListCheckOffService.toBuyListIsEmpty();
}


AlreadyBoughtShoppingControllerFunc.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingControllerFunc(ShoppingListCheckOffService) {
  var alreadyBoughtCtrl = this;
  alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
  //alreadyBoughtCtrl.alreadyBoughtListIsEmpty = ShoppingListCheckOffService.alreadyBoughtListIsEmpty();
}


function ShoppingListCheckOffServiceFunc() {
  var service = this;

  var toBuyList = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Apples",
      quantity: "8"
    }
  ];

  var alreadyBoughtList = [];

  service.getToBuyItems = function() {
    return toBuyList;
  };

  service.buyItem = function(index) {
    var item = toBuyList[index];
    toBuyList.splice(index, 1);
    alreadyBoughtList.push(item);
  };

  service.getBoughtItems = function() {
    return alreadyBoughtList;
  };

  // service.toBuyListIsEmpty = function() {
  //   return toBuyList.length === 0;
  // };
  //
  // service.alreadyBoughtListIsEmpty = function() {
  //   return alreadyBoughtList.length === 0;
  // };
}

})();
