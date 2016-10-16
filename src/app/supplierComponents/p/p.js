(function ()
{
    'use strict';


    var main = 'p'; // Change this with containing folder name
    var type = false;
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
  var state = 'app.'+name.toLowerCase();
  var stateUrl = '/'+name.toLowerCase()+'/:username';
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as self"
    },
    'content@app.p': {
      template: template,
    },     
    'toolbar@app.p': {
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
    $translatePartialLoaderProvider.addPart('app/supplierComponents/p');
  }

})();

