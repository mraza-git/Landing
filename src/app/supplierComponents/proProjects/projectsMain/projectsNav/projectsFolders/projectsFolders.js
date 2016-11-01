(function() {
  'use strict';

  var main = 'projects'; // Change this with containing folder name
  var type = 'Folders'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    $reactive(self).attach($scope);
    Roles.subscription = Meteor.subscribe("_roles");

    self.folders = [
      {name:'All Leads', key:'all',icon:'select-all'},
      {name:'Quoted',key:'quoted',icon:'pencil-box-outline'},
      {name:'Jobs',key:'jobs',icon:'square-inc-cash'},
      {name:'Favorites',key:'favorites',icon:'star'},
    ];

    self.helpers({
      isAdmin: function(){
        return Roles.userIsInRole(Meteor.userId(),['admin'],'default-group');
      }
    });
    self.autorun(function(){
      if(self.getReactively('isAdmin')){
        var adminFolders = [
          {name:'Draft',key:'draft',icon:'message-draw'},
          {name:'Archive', key:'archive',icon:'archive'},
          {name:'Delete',key:'delete',icon:'delete-variant'},
        ];
        self.folders.insertArray(100,adminFolders); 
      }
    });


    ///////////Methods Declarations///////////
    self.setCurrentFolder = setCurrentFolder;    
    self.isFolderActive = isFolderActive;



    ///////////Method Definitions///////////
    function setCurrentFolder(folder){
      self.currentFolder = folder;
    }
    function isFolderActive(name){
      return (self.currentFolder === name);
    }

  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsNav/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'iconAutocomplete',      
     ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        masterSettings: '<',
        currentFolder: '=',
      }
    });


})();
