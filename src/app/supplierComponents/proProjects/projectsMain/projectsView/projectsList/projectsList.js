(function() {
  'use strict';


  var main = 'projects'; // Change this with containing folder name
  var type = 'List';
  var CreateEditDialogController = CreateEditDialogController;


  function ControllerFunction($scope, $reactive, $mdDialog,$mdSidenav) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;

    $reactive(self).attach($scope);



    ///////////Data///////////
    self.filter = "deleted";
    
    

    ///////////Methods Declarations///////////
    self.openForm = openForm;
    self.closeThread = closeForm;
    self.toggleSelectForm = toggleSelectForm;
    self.isSelected = isSelected;

    ///////////Method Definitions///////////
    function openForm(form,sidenavId) {
      // Assign thread as the current thread
      self.currentForm = form;
      $mdSidenav(sidenavId).toggle();
    }

    function closeForm() {
      self.currentForm = undefined;
    }

    function toggleSelectForm(form, event) {
      if (event) {
        event.stopPropagation();
      }
      if (self.selectedForms.indexOf(form) > -1) {
        self.selectedForms.splice(self.selectedForms.indexOf(form), 1);
      } else {
        self.selectedForms.push(form);
      }
    }

    function isSelected(form) {
      return self.selectedForms.indexOf(form) > -1;
    }


  }


  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  
  angular
    .module(name, [
      'angular-meteor',
      'formView',
      'formServices',
      'formOwner',
      'formFoldericon',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        // shared data
        currentForm: '=',
        selectedForms: '=',
        currentFilter: '=',
        search: '<',
        forms: '<',
        masterSettings:"<",


        // Output
      }
    });


 

})();
