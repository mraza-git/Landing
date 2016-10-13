(function() {
  'use strict';


  var main = 'form'; // Change this with containing folder name
  var type = 'Owner';

  function ControllerFunction($scope, $reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    // self.subscribe('services');
    ///////////Data///////////
    self.colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];
    self.helpers({
      owner: function() {
        return Meteor.users.findOne({
          _id: self.getReactively('ownerId'),
        })
      },
    });
    ///////////Methods Declarations///////////



    ///////////Method Definitions///////////

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/adminComponents/forms/form/formView/formList/' + name + '/' + name + '.html';  
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', 'thumbImage' ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        ownerId: '<',
      }
    });


})();
