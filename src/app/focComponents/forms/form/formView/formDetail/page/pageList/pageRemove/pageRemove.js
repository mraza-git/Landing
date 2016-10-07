(function() {
  'use strict';

  var main = 'page'; // Change this with containing folder name
  var type = 'Remove'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope) {
    'ngInject';
    ///////////Data///////////
    var self = this;


    ///////////Methods Declarations///////////
    self.remove = remove;


    ///////////Method Definitions///////////
    function remove () {
      if (!self.index || !self.list) {
        self.error = 'Parameter insufficient';
        return; // no itemId injected.
      } else {
        self.list.splice(self.index, 1);
        if(self.done){ // if call back requested.
          self.done({$event: { list: self.list, } });
        }
      }
    }
  }

  var name = main + type;
  var templateUrl = 'app/focComponents/forms/form/formView/formDetail/page/pageList/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        index: '<',
        list: '=',
        done: '&',
      }
    });


})();
