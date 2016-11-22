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
  function ControllerFunction($scope,$reactive,returnUrlService,$state) {
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
      },
    });
    


    ///////////Methods Declarations///////////
    self.done = done;
    self.editJob = editJob; 
   

    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {
      console.log('Project: ',self.currentProject);      
    }    

    function editJob(){
      var returnUrl = {
        stateName: $state.current.name,
        stateParams: $state.params
      };
      returnUrlService.set(returnUrl);
      $state.go("app.serviceQuestions",{serviceId:self.currentProject.serviceId,leadId:self.currentProject._id});
    }

  

  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/projectDetail/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'returnUrlModule',      
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {        
        currentProject: '=',   
        showGallery:'<',    
        
      }
    });   

})();