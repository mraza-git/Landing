(function() {
  'use strict';

  var main = 'landing'; // Change this with containing folder name
  var type = 'Footer'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction() {
    'ngInject';
    ///////////Data///////////
    var self = this;
    


    ///////////Methods Declarations///////////
  
    ///////////Method Definitions///////////



   
  }

  var name = main + type;
  var templateUrl = 'app/sharedComponents/footers/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [    
      
      ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        url:'<'
      }
    });


})();
