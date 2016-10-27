(function () {
  'use strict';

  var main = 'project'; // Change this with containing folder name
  var type = 'Summary'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  /**
   * 
   * 
   * @param {any} $scope
   * @param {any} $stateParams
   */
  function ControllerFunction($scope,$reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    ///////////Data///////////
    self.helpers({
      userId: function(){
        return Meteor.userId();
      },
      isAdminOrSupport: function(){
        return Roles.userIsInRole(self.getReactively('userId'),['admin','support'],'default-group');
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
      console.log('Form: ',self.currentProject);
      self.update(event);
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