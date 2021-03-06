(function() {
  'use strict';

  var main = 'demo'; // Change this with containing folder name
  var type = 'Add'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    self.item = {};


    ///////////Methods Declarations///////////
    self.add = add;


    ///////////Method Definitions///////////
    function add() {
      if (self.index) {
        self.list.insert(self.item,self.index); // using custom method insert at any position.
      }
    }

  }

  var name = main + type;
  var templateUrl = 'app/adminComponents/forms/' + main + '/' + name + '/' + name + '.html';
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
