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
    setColor($scope,itemsCnt);
  };

  function setColor($scope,itemsCnt) {
    if(itemsCnt === 0) {
      $scope.outputMsgColor = {"color":"red"};
      $scope.borderColor = {"border-color": "red"};
    }
    else {
      $scope.outputMsgColor = {"color":"green"};
      $scope.borderColor = {"border-color":"green"};
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

//checked with min version
//!function(){"use strict";function o(o){function r(o,r){0===r?(o.outputMsgColor={color:"red"},o.borderColor={"border-color":"red"}):(o.outputMsgColor={color:"green"},o.borderColor={"border-color":"green"})}function e(o){var r=0,e=o.split(",");for(var n in e)null!==e[n]&&""!==e[n].trim()&&r++;return r}function n(o){var r;return r=1>o?"Please enter data first":o>=1&&3>=o?"Enjoy!":"Too much!"}o.lunchItems="",o.outputMsg="",o.generateMsg=function(){var t=e(o.lunchItems);o.outputMsg=n(t),r(o,t)}}angular.module("LunchCheck",[]).controller("LunchCheckController",o),o.$inject=["$scope"]}();
