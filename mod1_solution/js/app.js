(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchItems = "";
  $scope.outputMsg = "";

  $scope.generateMsg = function() {
    var itemsCnt = getNumOfItems($scope.lunchItems);
    $scope.outputMsg = getMsgBasedOnNumOfItems(itemsCnt);
  };

  function getNumOfItems(items) {
    return (items==null||items=="")?0:items.split(",").length;
  };

  function getMsgBasedOnNumOfItems(itemsCnt) {
    var msg;
    if(itemsCnt<1) {
      msg = "Please enter data first";
    }
    else if(itemsCnt>=1 && itemsCnt<=3) {
      msg = "Enjoy!";
    }
    else {
      msg = "Too much!";
    }
    return msg;
  };
};

})();
