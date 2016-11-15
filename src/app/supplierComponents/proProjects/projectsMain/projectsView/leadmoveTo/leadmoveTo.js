(function() {
  'use strict';

  var main = 'leadmove'; // Change this with containing folder name
  var type = 'To'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$mdDialog) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    self.folders = [
      {name:'Archive', key:'archive',icon:'archive'},
      {name:'Delete',key:'delete',icon:'delete-variant'},
      {name:'Trash',key:'trash',icon:'trash'},
    ];


    ///////////Methods Declarations///////////
    self.updateProjectFolder = updateProjectFolder;
    self.hardDeleteProjects = hardDeleteProjects;


    ///////////Method Definitions///////////
    function updateProjectFolder(event,folder) {
      if(folder==='trash'){
        self.hardDeleteProjects(event);
        return;

      }
      var message = "";
      if(folder==='delete'){
          message = 'All of these projects will be kept in your trash folder for 30days';
      }
      else{
        message = 'All of these projects will be moved to '+folder;
      }


      if (self.selectedProjects.length > 0) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to move all of these ' + self.selectedProjects.length + ' projects to '+folder+'?')
          .textContent(message)
          .ariaLabel('Deleting projects')
          .targetEvent(event)
          .ok('Please do it')
          .cancel('No please dont!!!!');

        $mdDialog.show(confirm).then(function() {
           Meteor.call('updateManyProjects',self.selectedProjects,folder,function(){
           });
           self.selectedProjects = [];
        }, function() {
          // Canceled
          console.log("Canceled");
        });
      }
    }

    function hardDeleteProjects(event) {
      if (self.selectedProjects.length > 0) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete all of these ' + self.selectedProjects.length + ' projects?')
          .textContent('All of these projects will deleted permanently')
          .ariaLabel('Deleting projects')
          .targetEvent(event)
          .ok('Please do it')
          .cancel('No please dont!!!!');

        $mdDialog.show(confirm).then(function() {
          var imageIds = self.selectedProjects.map(function(a) {
            if(!a.images)
              return "";
            return a.images.map(function(i){
              return i.id;
            });
          });
          Meteor.call('deleteManyImages',imageIds.flatten(),function(error,result){            
            var ids = self.selectedProjects.map(function(a) {
              return a._id
            });
            Meteor.call('trashManyProjects',ids,function(error,result){
              self.selectedProjects=[];
            });
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
        selectedProjects:'=',
      }
    });


})();
