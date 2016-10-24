(function ()
{
    'use strict';


    var main = 'service'; // Change this with containing folder name
    var type = 'Questions';
    function ControllerFunction($scope,$reactive,$stateParams,serviceName){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      if($stateParams.serviceId){        
      }

      if($stateParams.lead){        
        self.lead = JSON.parse($stateParams.lead);        
      }

      ///////////Data///////////
      self.subscribe("forms",function(){
         var selector = {
          serviceIds:$stateParams.serviceId,
        };
        return [
          {},selector
        ];
      });
      self.helpers({
        form: function(){
          return FocForms.findOne({
            $and:[
              {serviceIds: {$in:[$stateParams.serviceId]},},
              {folder: {$ne:'deleted'}},
              {folder: {$ne:'draft'}},
            ]
          });
        },
        service: function(){
          var service = Services.findOne($stateParams.serviceId);
          if(service){
            serviceName.set(service);
          }
          return service;
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
      ])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      
    }
  })
  .config(config);
  var template = '<'+main+'-'+type.toLowerCase()+'></'+main+'-'+type.toLowerCase()+'>';
  var state = 'app.'+name;
  var stateUrl = '/'+name + '/:serviceId/:lead';
  var views = {
    'content@app.serviceQuestions': {
      template: template,
    },     
     'main@':{
       templateUrl: 'app/sharedComponents/layouts/service-questions.html',
       controller: 'MainController as vm'
     },
     'toolbar@app.serviceQuestions':{
       template: '<questions-toolbar></questions-toolbar>',       
     },
     
  };
  /** @ngInject */
  function config($stateProvider)
  {
    // State
    $stateProvider
    .state(state, {
      url    : stateUrl,
      views  : views,

    });
  }

})();

(function() {
'use strict';

  angular
    .module('ServiceNameModule',[])
    .service('serviceName', serviceName);

  serviceName.$inject = [];
  function serviceName() {
    this.set = set;
    this.get = get;
    this.service = {};
    
    ////////////////

    function set(service) {
      if(service){
        this.service.name = service.name;
        this.service.description = service.description;
      }
     }
     function get (){
       return this.service;
     }
    }
})();

