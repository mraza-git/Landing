(function () {
  'use strict';


  var main = 'lead'; // Change this with containing folder name
  var type = 'Location';

  function ControllerFunction($scope, $reactive, $mdToast, $state, serviceName,$timeout,leadSessionService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);

    ///////////Data///////////    
    leadSessionService.get().then(function(res){
      self.lead = res;      
    },function(err){
      console.log(err);
    });

    self.okToSave = false;

    self.helpers({
      isLoggedIn: function () {
        return !!Meteor.userId();
      },
      service: function () {
        var service = Services.findOne(self.getReactively('lead.serviceId'));
        if (service) {
          serviceName.set(service);
        }
        return service;
      },
      userId: function () {
        return Meteor.userId();
      }
    });



    ///////////Methods Declarations///////////   
    self.nextPage = nextPage;
   



    ///////////Method Definitions///////////
    function nextPage() {      
      leadSessionService.set(self.lead);                    
      $state.go('app.leadSummary');
    }
      
      


  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/landing/serviceQuestions/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'questionsToolbar',
      'ServiceNameModule',
      'leadSessionStorage'
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {

      }
    })
    .config(config);
  var template = '<' + main + '-' + type.toLowerCase() + '></' + main + '-' + type.toLowerCase() + '>';
  var state = 'app.' + name.toLowerCase();
  var stateUrl = '/' + main + '-' + type.toLowerCase();
  var views = {
    'content@app.leadlocation': {
      template: template,
    },
    'main@': {
      templateUrl: 'app/core/layouts/content-with-toolbar.html',
      controller: 'MainController as vm'
    },
    'toolbar@app.leadlocation': {
      template: '<questions-toolbar></questions-toolbar>',
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