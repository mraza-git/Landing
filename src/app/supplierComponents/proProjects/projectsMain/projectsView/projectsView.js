(function() {
  'use strict';

  var main = 'projects'; // Change this with containing folder name
  var type = 'View'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope, $reactive, $mdDialog,$mdSidenav,$timeout) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    ///////////Data///////////    
    self.currentProject = undefined;
    self.loading = false;
    self.selectedProjects = [];    
    self.selectedProject = undefined;
    Roles.subscription = Meteor.subscribe("_roles")
    
    self.helpers({
      currentUser: function() {
        return Meteor.user();
      },
      projects: function(){
        self.loading = true;
        var forms =[];
        var selector = {
          folder:{$nin:['delete','archive']}
        };
        var folder = self.getReactively('currentFolder');
        if( folder !== 'all'){
          if(_.contains(['delete','archive'],folder)){
            selector = {
                $and : [
                  {folder: self.getReactively('currentFolder') || 'all'},
                  // {folder: {$nin:['delete','archive']}},                
                ]
            };
          }else if (folder === 'quoted'){
            selector ={
              _id:{$in: self.getReactively('currentUser.business.quoted')}
            }
          }
          else if (folder === 'jobs'){
            selector ={
              _id:{$in: self.getReactively('currentUser.business.jobs')}
            }
          }
          else if (folder === 'favorites'){
            selector ={
              _id:{$in: self.getReactively('currentUser.business.favorites')}
            }
          }

        }
        var cursor = Leads.find(selector,{sort:{createdAt:-1,}});          
                
        if(self.loading){
          self.currentProject = cursor.fetch()[0]; //populating the first item at the start.
          if(self.currentProject)
          self.loading=false;          
        }
        
        return cursor;        
      },
      isAdmin: function(){
        return Roles.userIsInRole(Meteor.userId(),['admin'],'default-group');
      }
     
    });


    ///////////Methods Declarations///////////
    self.done = done;
    self.deselectProjects = deselectProjects;
    self.toggleListNav = toggleListNav;
    self.toggleSelectProjects = toggleSelectProjects;
    self.update = update;
    self.selectProjects = selectProjects;





    ///////////Method Definitions///////////
    function done(event){
      self.currentProject.isChanged = true;
    }

    function deselectProjects() {
      self.selectedProjects = [];
    }

    function toggleListNav(sidenavId){
      $mdSidenav(sidenavId).toggle();
      self.listNavIsOpen = $mdSidenav(sidenavId).isOpen();
    }

    function toggleSelectProjects() {
      if (self.selectedProjects.length > 0) {
        self.deselectProjects();
      } else {
        self.selectProjects();
      }
    }

    function update(){
      var project = angular.copy(self.currentProject);
      var id = project._id;
      delete project._id;  
      delete project.isChanged;
      Leads.update({
        _id:id
      }, {
        $set: project,
      },function(err,docs){
        if(err){
          console.log("Error while saving project:",err);
        }
        else{
          console.log("Project Saved.", docs);
          self.currentProject.isChanged = false;
        }
      });
      
    }

    function selectProjects(key, value) {
      // Make sure the current selection is cleared
      // before trying to select new threads
      self.selectedProjects = [];

      for (var i = 0; i < self.projects.length; i++) {
        if (angular.isUndefined(key) && angular.isUndefined(value)) {
          self.selectedProjects.push(self.projects[i]);
          continue;
        }

        if (angular.isDefined(key) && angular.isDefined(value) && self.projects[i][key] === value) {
          self.selectedProjects.push(self.projects[i]);
        }
      }

    }






  }
  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  


  angular
    .module(name, [
      'angular-meteor',
      'leadmoveTo',      
      'projectDetail',
      'projectsList',
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
        currentProject: '=',
        currentFolder: '=',
        masterSettings: '<',

      }
    });


})();
