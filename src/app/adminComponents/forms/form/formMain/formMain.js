(function() {
  'use strict';


  var main = 'form'; // Change this with containing folder name
  var type = 'Main';

  function ControllerFunction($scope, $reactive, $mdSidenav, SettingService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    self.currentFolder = 'all';
    $reactive(self).attach($scope);
    self.limit = 10;
    self.page = 1;
    self.subscribe('forms', function() {
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
        return Settings.find();
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

  var name = main + type;
  var templateUrl = 'app/adminComponents/forms/' + main + '/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'formView',  
      'formNav',
      'settingService'
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
  var template = '<' + main + '-' + type.toLowerCase() + '></' + main + '-' + type.toLowerCase() + '>';
  var state = 'app.' + name;
  var stateUrl = '/' + name;
  var views = {
    'content@app': {
      template: template,
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
