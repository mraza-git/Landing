(function ()
{
    'use strict';


    var main = 'lead'; // Change this with containing folder name
    var type = 'Summary';
    function ControllerFunction($scope,$reactive,$stateParams){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      if($stateParams.lead){
        console.log("lead: ", $stateParams.lead);
        self.lead = JSON.parse($stateParams.lead);        
      }

      ///////////Data///////////
    //   self.subscribe("leads",function(){
    //       return [self.getReactively(lead._id)];
    //   });
    //   self.helpers({
    //     form: function(){
    //       return FocForms.findOne({
    //         serviceIds: $stateParams.serviceId,
    //       });
    //     }
    //   });

      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/main/landing/serviceQuestions/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
      'angular-meteor',
      'questionsToolbar',      
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
  var stateUrl = '/'+name + '/:lead';
  var views = {
    'content@app.leadSummary': {
      template: template,
    },     
     'main@':{
       templateUrl: 'app/core/layouts/content-with-toolbar.html',
       controller: 'MainController as vm'
     },
     'toolbar@app.leadSummary':{
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
