(function() {
  'use strict';

  var main = 'icon'; // Change this with containing folder name
  var type = 'Autocomplete'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    $reactive(self).attach($scope);
    self.subscribe('icons', function(){
      return [{
        limit: 5,
        fields: {'properties.name': 1, iconIdx: 1,},
        sort:{iconIdx: 1},
      },self.getReactively('iconSearch')]
    });
    self.helpers({
      icons: function(){
        return Icons.find();
      }
    });
    ///////////Methods Declarations///////////
    self.selectedItemChange=selectedItemChange;
    ///////////Method Definitions///////////
    function selectedItemChange(icon){
      self.done({
        $event:{
          icon:icon
        }
      });
    }
  }

  var name = main + type;
  var templateUrl = 'app/adminComponents/forms/utils/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        iconSearch: '=',
        done: '&',
      }
    });


})();
