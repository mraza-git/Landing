(function() {
  'use strict';


  var main = 'form'; // Change this with containing folder name
  var type = 'Services';

  function ControllerFunction($scope, $reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    // self.subscribe('services');
    ///////////Data///////////
    self.helpers({
      services: function() {
        return Services.find({
          _id: {
            $in: this.getReactively('serviceIds') || []
          }
        });
      },
    });
    ///////////Methods Declarations///////////



    ///////////Method Definitions///////////

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/focComponents/forms/' + main + '/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        serviceIds: '<',
        type:'@',
      }
    });


})();
