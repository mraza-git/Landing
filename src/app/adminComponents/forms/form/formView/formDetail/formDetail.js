(function () {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'Detail'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

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
      console.log('Form: ',self.currentForm);
      self.update(event);
    }    

  }

  var name = main + type;
  var templateUrl = 'app/adminComponents/forms/form/formView/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'formServices',
      'pageList'
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        itemId: '<',
        update: '&',
        currentForm: '=',       
        
      }
    });   

})();