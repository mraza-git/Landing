(function() {
  'use strict';

  var main = 'projects'; // Change this with containing folder name
  var type = 'Nav'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,$mdDialog) {
    'ngInject';


    ///////////Initialization Checks///////////
    var self = this;
    self.limit = 5;
    self.iconSearch = "";    
    $reactive(self).attach($scope);
    ///////////Data///////////
    self.helpers({
      currentUser: function(){
        return Meteor.user();
      },
      services: function(){
        return Services.find();
      }
    });


    ///////////Methods Declarations///////////
    self.openCreateDialog = openCreateDialog;
    self.setService = setService;


    // self.openEditDialog = openEditDialog;



    ///////////Method Definitions///////////
    function setService(){
      // console.log(self.selectedService);
    }
    function openCreateDialog(ev){
      $mdDialog.show({
              controller       : CreateEditDialogController,
              controllerAs  : 'form',
              locals             : {
                  selectedForm: undefined
              },
              templateUrl    : 'app/adminComponents/forms/form/modalBoxes/formCreate-dialog/formCreate-dialog.html',
              parent             : angular.element(document.body),
              targetEvent     : ev,
              clickOutsideToClose: true
          }).then(function(res){
            if(res){
              self.currentForm = res;
              self.currentFolder = 'draft';
            }
          });
    }



  }


  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'ngMessages',
      'projectsFolders',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        selectedService: '=',
        masterSettings: '=',
        currentFolder: '=',
        currentProject: '=',
      }
    });


})();
