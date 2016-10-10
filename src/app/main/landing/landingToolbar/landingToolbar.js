(function() {
  'use strict';

  var main = 'landing'; // Change this with containing folder name
  var type = 'Toolbar'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction() {
    'ngInject';
    ///////////Data///////////
    var self = this;


    ///////////Methods Declarations///////////
   


    ///////////Method Definitions///////////
   
  }

  var name = main + type;
  var templateUrl = 'app/main/landing/' + name + '/' + name + '.html';
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
