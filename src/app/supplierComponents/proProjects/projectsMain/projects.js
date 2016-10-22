(function() {
  'use strict';


  var main = 'projects'; // Change this with containing folder name
  var type = false;

  function ControllerFunction($scope, $reactive, $mdSidenav) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    self.currentFolder = 'all';
    $reactive(self).attach($scope);
    self.limit = 10;
    self.page = 1;
    self.subscribe('leads', function() {
      var search= self.getReactively('search');
      var selector ={};
      if(self.getReactively('currentFolder') === 'all'){
        if (search) {
            selector ={
              $and : [
              {
                title: {
                  $regex: '.*'+self.getReactively('search')+'.*',
                  $options: 'i',
                }
              },        
              { 
                folder:{$ne:'deleted'}
              }
              ]
            };
        }else{
          selector = {folder:{$ne:'deleted'}};
        }        
      }else{
        if (search) {
            selector ={
              $and : [
              {
                title: {
                  $regex: '.*'+self.getReactively('search')+'.*',
                  $options: 'i',
                }
              },        
              { 
                folder: self.getReactively('currentFolder')
              }
              ]
            };
        }
        else{
          selector = {folder:self.getReactively('currentFolder')};
        } 
      }
      return [{
        limit: parseInt(self.getReactively('limit')),
        skip: parseInt((self.getReactively('page') - 1) * self.limit),
        sort: {
          updatedAt: 1
        },
      }, selector];
    });


    ///////////Data///////////
    self.helpers({
      currentUser: function() {
        return Meteor.user();
      },
      masterSettings: function() {
        return Settings.findOne({
          owner: Meteor.userId(),
        });
      }
    });




    ///////////Methods Declarations///////////
    self.toggleSidenav = toggleSidenav;


    ///////////Method Definitions///////////
    function toggleSidenav(sidenavId) {
      $mdSidenav(sidenavId).toggle();
      self.listNavLockedOpen = true;
    }


  }

  var name = main + (type?type:""); // Change This with Component Name
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'pagesToolbar',
      'projectsView',  
      'projectsNav',  
         
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        input: '<',
        output: '&',
      }
    })
    .config(config);
  var template = '<'+main+ (type?'-':'')+(type?type.toLowerCase():'')+'></'+main+(type?'-':'')+(type?type.toLowerCase():'')+'>';
  var state = 'app.'+name.toLowerCase();
  var stateUrl = '/'+name.toLowerCase();
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as self"
    },
    'content@app.projects': {
      template: template, 
    },     
    'toolbar@app.projects': {
      template: '<pages-toolbar></pages-toolbar>',
    },
     
  };

  /** @ngInject */
  function config($stateProvider) {
    // State
    $stateProvider
      .state(state, {
        url: stateUrl,
        views: views,

      });
  }

})();
