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
    self.selectedItemChange = selectedItemChange;


    ///////////Method Definitions///////////
    function selectedItemChange(item){
      if(item){
        if(self.done){
          self.done({
            $event:{
              serviceId: item._id,
            }
          });
        }
      }
    }
   
  }

  var name = main + type;
  var templateUrl = 'app/sharedComponents/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {        
        done: '&',
      }
    });


})();
