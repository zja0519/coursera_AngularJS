(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/templates/items-list.template.html',
  bindings: {
    items: '<'
  }
});

})();
