(function ()
{
    'use strict';


    var main = 'pro'; // Change this with containing folder name
    var type = 'Detail';
    function ControllerFunction($scope,$reactive,$stateParams,$mdToast){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      
      ///////////Data///////////
      if(!!Meteor.userId()){        
        self.subscribe("userData");
        self.helpers({
          user: function(){
            return Meteor.users.findOne(Meteor.userId());
          }
        });        
      }else{
        console.log("you need to log in to update your profile....");
        $mdToast.show(
              $mdToast.simple()
              .textContent('you need to log in to update your profile....')               
              .position('top right')
              .action('x')
              .hideDelay(5000)
            );
      }
      
            

      ///////////Methods Declarations///////////
      self.update = update;
      


      ///////////Method Definitions///////////      
      function update(){
        var user = angular.copy(self.user);
        Meteor.users.update()
      }
     

    }

  var name = main + (type?type:""); // Change This with Component Name
  var templateUrl = 'app/supplierComponents/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',  
    'pagesToolbar',
    'validation.match',
    'proRegister',
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

