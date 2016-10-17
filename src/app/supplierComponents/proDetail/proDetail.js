(function ()
{
    'use strict';


    var main = 'pro'; // Change this with containing folder name
    var type = 'Detail';
    function ControllerFunction($scope,$reactive,$stateParams){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      
      ///////////Data///////////
      if(!$stateParams.username){        
        self.subscribe("userData");
        self.helpers({
          user: function(){
            return Meteor.users.findOne(Meteor.userId());
          }
        });        
      }else{
        self.subscribe("publicUserData",function(){
          return [$stateParams.username];
        });
        self.helpers({
          user: function(){
            return Meteor.users.findOne({username:$stateParams.username});
          }
        });
      }
      
            

      ///////////Methods Declarations///////////
      


      ///////////Method Definitions///////////      
     
     

    }

  var name = main + (type?type:""); // Change This with Component Name
  var templateUrl = 'app/supplierComponents/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',  
    'pagesToolbar',
    'validation.match',
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
  var state = 'app.'+name;
  var stateUrl = '/pro/'+type.toLowerCase()+'/:username';
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as self"
    },
    'content@app.proDetail': {
      template: template,
    },     
    'toolbar@app.proDetail': {
      template: '<pages-toolbar></pages-toolbar>',
    },
     
  };

  
  
  /** @ngInject */
  function config($stateProvider,$translatePartialLoaderProvider)
  {
    // State
    $stateProvider
    .state(state, {
      url    : stateUrl,
      views  : views,
      bodyClass: 'register',

    });
    $translatePartialLoaderProvider.addPart('app/supplierComponents/proDetail');
  }

})();

