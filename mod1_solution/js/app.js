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
    setOutputMsgColor($scope,itemsCnt);
  };

  function setOutputMsgColor($scope,itemsCnt) {
    if(itemsCnt === 0) {
      $scope.outputMsgColor = {"color":"red"};
    }
    else {
      $scope.outputMsgColor = {"color":"green"};
    }
  };

  function getNumOfItems(items) {
    //return (items==null||items=="")?0:items.split(",").length;
    var intemCnt = 0;
    var itemArry = items.split(",");
    for(var i in itemArry) {
      if(itemArry[i]!==null && itemArry[i].trim()!=="") {
        intemCnt++;
      }
    }
    return intemCnt;
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
