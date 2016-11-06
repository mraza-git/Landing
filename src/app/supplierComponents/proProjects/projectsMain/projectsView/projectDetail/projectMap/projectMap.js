(function () {
  'use strict';

  var main = 'project'; // Change this with containing folder name
  var type = 'Map'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  /**
   * 
   * 
   * @param {any} $scope
   * @param {any} $stateParams
   */
  function ControllerFunction($scope, $reactive,NgMap,$rootScope) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    

   
    ///////////Data///////////
    self.helpers({
      user:function(){
        return Meteor.user();
      }
    });

    ///////////Methods Declarations///////////
    self.done = done;
   
    

    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {   
      self.update(event);
    }    

    

  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/projectDetail/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',   
      'focGmap',
      'ngMap'   
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {        
        location: '=',
        ready: '<'        
      }
    });   

})();