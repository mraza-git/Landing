(function ()
{
    'use strict';


    var main = 'active'; // Change this with containing folder name
    var type = 'Jobs';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      ///////////Data///////////
      self.subscribe('leadsByOwnerId');
      self.helpers({
        projects:function(){
          return Leads.find({
            owner: Meteor.userId(),
            $or: 
            [
                {status:'open'},
                {status:{$exists:false}},
            ]            
          });
        }
      });


      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',  
    'pagesToolbar',    

    ])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      input:'<',
      output: '&',
    }
  })
  .config(config);
  var template = '<'+main+ (type?'-':'')+(type?type.toLowerCase():'')+'></'+main+(type?'-':'')+(type?type.toLowerCase():'')+'>';
  var state = 'app.'+name.toLowerCase();
  var stateUrl = '/'+main+'-'+type.toLowerCase();
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as self"
    },
    'content@app.activejobs': {
      template: template,
    },     
    'toolbar@app.activejobs':{
      template: '<landing-toolbar></landing-toolbar>',
      
    }
     
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
