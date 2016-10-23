(function () {
  'use strict';

  var main = 'project'; // Change this with containing folder name
  var type = 'OwnerContact'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  /**
   * 
   * 
   * @param {any} $scope
   * @param {any} $stateParams
   */
  function ControllerFunction($scope, $stateParams) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    if ($stateParams.itemId) {
      self.itemId = $stateParams.itemId;
    }
    ///////////Data///////////


    ///////////Methods Declarations///////////
    self.done = done;

    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {     
      
    }    

  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/projectDetail/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',      
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {        
        currentProject: '=',       
        
      }
    });   

})();