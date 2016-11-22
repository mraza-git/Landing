(function () {
  'use strict';


  var main = 'service'; // Change this with containing folder name
  var type = 'Questions';

  function ControllerFunction($scope, $reactive, $stateParams, serviceName, leadSessionService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    self.ready = false;
    if ($stateParams.serviceId) {}

    if ($stateParams.leadId) {
      self.leadId = $stateParams.leadId;
    }
    

    ///////////Data///////////
    self.subscribe("forms", function () {
      var selector = {
        $and: 
        [
          {
            serviceIds: {$in: [$stateParams.serviceId]},
          }, 
          {
            folder: {$ne: 'deleted'}
          }, 
          {
            folder: {$ne: 'draft'}
          }, 
        ]
      };
      return [{}, selector];
    }, function () {
      self.ready = true;
    });

    self.subscribe('leadsByIds',function(){
      return [
        [$stateParams.leadId]
      ]
    });

    self.helpers({
      form: function () {
        return FocForms.findOne({
            serviceIds: $stateParams.serviceId            
        });
      },
      service: function () {
        var service = Services.findOne($stateParams.serviceId);
        if (service) {
          serviceName.set(service);
        }
        return service;
      },
      lead: function(){
        return Leads.findOne({
          _id: $stateParams.leadId
        });
      }
    });

    ///////////Methods Declarations///////////



    ///////////Method Definitions///////////

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/landing/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'questionsToolbar',
      'formPreview',
      'ServiceNameModule',
      'leadSessionStorage',
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
  var state = 'app.' + name;
  var stateUrl = '/' + name + '/:serviceId/:leadId';
  var views = {
    'content@app.serviceQuestions': {
      template: template,
    },
    'main@': {
      templateUrl: 'app/sharedComponents/layouts/service-questions.html',
      controller: 'MainController as vm'
    },
    'toolbar@app.serviceQuestions': {
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









