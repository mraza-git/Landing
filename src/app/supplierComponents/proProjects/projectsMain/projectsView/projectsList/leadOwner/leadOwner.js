(function() {
  'use strict';


  var main = 'lead'; // Change this with containing folder name
  var type = 'Owner';

  function ControllerFunction($scope, $reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    // self.subscribe('services');
    ///////////Data///////////
    self.colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];
    self.subscribe('userById',function(){
      return [
        [self.getReactively('ownerId')] || []
      ]
    });
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
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/projectsList/' + name + '/' + name + '.html';  
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
