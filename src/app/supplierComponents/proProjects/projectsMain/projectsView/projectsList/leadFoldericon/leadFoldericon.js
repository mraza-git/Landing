(function() {
  'use strict';


  var main = 'lead'; // Change this with containing folder name
  var type = 'Foldericon';

  function ControllerFunction($scope, $reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);


    ///////////Data///////////
    self.helpers({
      icon: function(){
        if(self.getReactively('masterSettings',true)){
          var settings = self.getReactively('masterSettings',true);
          var fol = settings[0].forms.folders.filter(function( obj ) {
            return obj.key === self.getReactively('folder');
        });
        return fol[0].icon;
        }
      }
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
        masterSettings: '<',
        folder:'<',
      }
    });


})();
