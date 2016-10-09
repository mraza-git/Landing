(function() {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'Folders'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,SettingService) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    self.addingFolder = false;
    self.newFolder = {};


    ///////////Methods Declarations///////////
    self.addFolder = addFolder;
    self.iconSelected = iconSelected;
    self.setCurrentFolder = setCurrentFolder;
    self.isFolderActive = isFolderActive;



    ///////////Method Definitions///////////
    function addFolder(){
      self.newFolder.key = self.newFolder.name.toLowerCase();
      SettingService.addFormsFolder(self.newFolder).then(function(result){
        // success toast here.
      },function(error){
        // error toast here
      });
      self.addingFolder=false;
    }
    function removeFolder(folder){
      SettingService.removeFormsFolder(folder).then(function(result){
        // success toast here.
      },function(error){
        // error toast here
      });
    }
    function iconSelected(event){
      self.newFolder.icon = event.icon;
    }
    function setCurrentFolder(folder){
      self.currentFolder = folder;
    }
    function isFolderActive(name){
      return (self.currentFolder === name);
    }

  }

  var name = main + type;
  var templateUrl = 'app/focComponents/forms/form/formNav/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'iconAutocomplete',
      'settingService'
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
