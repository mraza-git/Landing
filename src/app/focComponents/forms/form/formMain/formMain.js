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
      return [{
        limit: parseInt(self.getReactively('limit')),
        skip: parseInt((self.getReactively('page') - 1) * self.limit),
        sort: {
          createdAt: 1
        },
      }, self.getReactively('search')];
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
  var templateUrl = 'app/focComponents/forms/' + main + '/' + name + '/' + name + '.html';
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
