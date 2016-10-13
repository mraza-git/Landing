(function() {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'Edit'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$mdDialog) {
    'ngInject';
    ///////////Data///////////
    var self = this;


    ///////////Methods Declarations///////////
    self.openEditDialog = openEditDialog;

    ///////////Method Definitions///////////
    function openEditDialog(ev) {
      $mdDialog.show({
        controller: CreateEditDialogController,
        controllerAs: 'form',
        locals: {
          selectedForm: self.currentForm,
        },
        templateUrl: 'app/adminComponents/forms/form/modalBoxes/formCreate-dialog/formCreate-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function(res) {

      });
    }

  }

  var name = main + type;
  var templateUrl = 'app/adminComponents/forms/form/formView/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        masterSettings: '<', // for folder icons
        currentForm:'=',
      }
    });


})();
