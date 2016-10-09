(function() {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'View'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope, $reactive, $mdDialog,$mdSidenav,$timeout) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    ///////////Data///////////    
    self.currentForm = undefined;
    self.loading = false;
    self.selectedForms = [];
    self.selectedForm = undefined;
    self.helpers({
      currentUser: function() {
        return Meteor.user();
      },
      forms: function() {
        var forms =[];
        var selector = {};
        if(self.getReactively('currentFolder') !== 'all'){
          selector = {
            $and : [
            {folder: self.getReactively('currentFolder') || 'all'},
            {deleted: false}
          ]};
        }
        var cursor = FocForms.find(selector);
        $timeout(function(){
          if(!self.loading){
            self.currentForm = cursor.fetch()[0]; //populating the first item at the start.
            if(self.currentForm)
            self.loading=false;
          }
        },1);
        return cursor;
      }
    });


    ///////////Methods Declarations///////////
    self.done = done;
    self.deselectForms = deselectForms;
    self.toggleListNav = toggleListNav;
    self.toggleSelectForms = toggleSelectForms;
    self.update = update;
    self.selectForms = selectForms;





    ///////////Method Definitions///////////
    function done(event){
      self.currentForm.isChanged = true;
    }

    function deselectForms() {
      self.selectedForms = [];
    }

    function toggleListNav(sidenavId){
      $mdSidenav(sidenavId).toggle();
      self.listNavIsOpen = $mdSidenav(sidenavId).isOpen();
    }

    function toggleSelectForms() {
      if (self.selectedForms.length > 0) {
        self.deselectForms();
      } else {
        self.selectForms();
      }
    }

    function update(){
      var form = angular.copy(self.currentForm);
      var id = form._id;
      delete form._id;  
      delete form.isChanged;
      FocForms.update({
        _id:id
      }, {
        $set: form,
      },function(err,docs){
        if(err){
          console.log("Error while saving form:",err);
        }
        else{
          console.log("Form Saved.", docs);
          self.currentForm.isChanged = false;
        }
      });
      
    }

    function selectForms(key, value) {
      // Make sure the current selection is cleared
      // before trying to select new threads
      self.selectedForms = [];

      for (var i = 0; i < self.forms.length; i++) {
        if (angular.isUndefined(key) && angular.isUndefined(value)) {
          self.selectedForms.push(self.forms[i]);
          continue;
        }

        if (angular.isDefined(key) && angular.isDefined(value) && self.forms[i][key] === value) {
          self.selectedForms.push(self.forms[i]);
        }
      }

    }






  }
  var name = main + type;
  var templateUrl = 'app/focComponents/forms/' + main + '/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'moveTo',
      'formEdit',
      'formDetail',
      'formList',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        index: '<',
        list: '=',
        done: '&',
        search: '<',
        currentForm: '=',
        currentFolder: '=',
        masterSettings: '<',

      }
    });


})();
