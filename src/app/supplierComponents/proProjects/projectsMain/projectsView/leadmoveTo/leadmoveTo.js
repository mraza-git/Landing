(function() {
  'use strict';

  var main = 'leadmove'; // Change this with containing folder name
  var type = 'To'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$mdDialog) {
    'ngInject';
    ///////////Data///////////
    var self = this;


    ///////////Methods Declarations///////////
    self.updateFormFolder = updateFormFolder;
    self.trash = hardDeleteForms;


    ///////////Method Definitions///////////
    function updateFormFolder(event,folder) {
      var message = "";
      if(folder==='deleted'){
          message = 'All of these forms will be kept in your trash folder for 30days';
      }
      else{
        message = 'All of these forms will be moved to '+folder;
      }

      if (self.selectedForms.length > 0) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to move all of these ' + self.selectedForms.length + ' forms to '+folder+'?')
          .textContent(message)
          .ariaLabel('Deleting forms')
          .targetEvent(event)
          .ok('Please do it')
          .cancel('No please dont!!!!');

        $mdDialog.show(confirm).then(function() {
           Meteor.call('updateManyForms',self.selectedForms,folder,function(){
           });
           self.selectedForms = [];
        }, function() {
          // Canceled
          console.log("Canceled");
        });
      }
    }

    function hardDeleteForms(event) {
      if (self.selectedForms.length > 0) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete all of these ' + self.selectedForms.length + ' forms?')
          .textContent('All of these forms will be kept in your trash folder for 30days')
          .ariaLabel('Deleting forms')
          .targetEvent(event)
          .ok('Please do it')
          .cancel('No please dont!!!!');

        $mdDialog.show(confirm).then(function() {
          var ids = self.selectedForms.map(function(a) {
            return a._id
          });
          Meteor.call('deleteManyForms',ids,function(error,result){
            console.log(result);
          });
        }, function() {
          // Canceled
        });
      }
    }
  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        masterSettings: '<', // for folder icons
        selectedForms:'=',
      }
    });


})();
