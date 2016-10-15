(function ()
{
    'use strict';


    var main = 'service'; // Change this with containing folder name
    var type = 'Questions';
    function ControllerFunction($scope,$reactive,$stateParams){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      if($stateParams.serviceId){
        console.log("ServiceID: ", $stateParams.serviceId);
      }

      ///////////Data///////////
      self.subscribe("forms");
      self.helpers({
        form: function(){
          return FocForms.findOne({
            serviceIds: $stateParams.serviceId,
          });
        },
        service: function(){
          return Services.findOne($stateParams.serviceId);
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
  var stateUrl = '/'+name + '/:serviceId';
  var views = {
    'content@app.serviceQuestions': {
      template: template,
    },     
     'main@':{
       templateUrl: 'app/core/layouts/content-with-toolbar.html',
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
