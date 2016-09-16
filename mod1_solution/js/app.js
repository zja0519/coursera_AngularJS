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

//checked with min version
//!function(){"use strict";function t(t){function n(t,n){0===n?t.outputMsgColor={color:"red"}:t.outputMsgColor={color:"green"}}function o(t){var n=0,o=t.split(",");for(var r in o)null!==o[r]&&""!==o[r].trim()&&n++;return n}function r(t){var n;return n=1>t?"Please enter data first":t>=1&&3>=t?"Enjoy!":"Too much!"}t.lunchItems="",t.outputMsg="",t.generateMsg=function(){var u=o(t.lunchItems);t.outputMsg=r(u),n(t,u)}}angular.module("LunchCheck",[]).controller("LunchCheckController",t),t.$inject=["$scope"]}();
