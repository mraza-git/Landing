(function() {
  'use strict';


  var main = 'projects'; // Change this with containing folder name
  var type = 'List';
  var CreateEditDialogController = CreateEditDialogController;


  function ControllerFunction($scope, $reactive, $mdDialog,$mdSidenav,$timeout) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    self.ready = true;

    $reactive(self).attach($scope);



    ///////////Data///////////
    self.filter = "deleted";
    self.autorun(function(){
      if(self.getReactively('currentProject')){
        self.ready = false;
        $timeout(function(){
          self.ready = true;
        },100);
      }
    });
    
    

    ///////////Methods Declarations///////////
    self.openProject = openProject;
    self.closeThread = closeProject;
    self.toggleSelectProject = toggleSelectProject;
    self.isSelected = isSelected;
    self.loadMore = loadMore;

    ///////////Method Definitions///////////
    function openProject(project,sidenavId) {
      // Assign thread as the current thread
      self.currentProject = project;
      $mdSidenav(sidenavId).toggle();
    }

    function closeProject() {
      self.currentProject = undefined;
    }
    function loadMore(){
      self.getMore();
    }

    function toggleSelectProject(project, event) {
      if (event) {
        event.stopPropagation();
      }
      if (self.selectedProjects.indexOf(project) > -1) {
        self.selectedProjects.splice(self.selectedProjects.indexOf(project), 1);
      } else {
        self.selectedProjects.push(project);
      }
    }

    function isSelected(project) {
      return self.selectedProjects.indexOf(project) > -1;
    }


  }


  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  
  angular
    .module(name, [
      'angular-meteor',
      'leadOwner',
      'leadFoldericon',
      'projectBudget',
      'getDistance',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        // shared data
        currentProject: '=',
        selectedProjects: '=',
        currentFilter: '=',
        search: '<',
        projects: '<',
        masterSettings:"<",
        ready: '=',
        getMore: '&',


        // Output
      }
    });


 

})();
