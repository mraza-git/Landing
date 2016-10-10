(function() {
  'use strict';

  var main = 'service'; // Change this with containing folder name
  var type = 'Autocomplete'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    $reactive(self).attach($scope);
    self.helpers({
      services: function(){
        return Services.find({});
      },
    });


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
