(function ()
{
    'use strict';


    var main = 'pro'; // Change this with containing folder name
    var type = 'Register';
    function ControllerFunction($scope,$reactive,$state){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      ///////////Data///////////
      self.form = {};
      self.emailAvailable = true;
      self.usernameAvailable = true;
      self.subscribe('userData');
                  

      ///////////Methods Declarations///////////
      self.register = register;     


      ///////////Method Definitions///////////
      function register(){
        self.loading = true;        
        Meteor.call('createNewUser',self.form,['supplier'],'supplier-group',function(error){
          if(error){
            self.error = error;            
            self.loading = false;
          }
          else{
            self.loading = false;
            console.log("User with role supplier created");
            $state.go('app.profileedit',{username: Meteor.user().username});
          }

        });
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
  .config(config)
  .directive('uniqueUsername',username)
  .directive('uniqueEmail',email)  

  var template = '<'+main+ (type?'-':'')+(type?type.toLowerCase():'')+'></'+main+(type?'-':'')+(type?type.toLowerCase():'')+'>';
  var state = 'app.'+name;
  var stateUrl = '/pro/'+type.toLowerCase();
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-only.html',
          controller: "MainController as self"
    },
    'content@app.proRegister': {
      template: template,
    },     
     
  };
  function username($q){
    'ngInject';
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.uniqueUsername = function(modelValue) {
          var defer = $q.defer();
          Meteor.call('checkAvailableUsername',modelValue,function(error){
            if (error){              
              defer.reject();
            }else{              
              defer.resolve();
            }
          });
          return defer.promise;
        }
      }
    };
  }
  function email($q){
    'ngInject';
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.uniqueEmail = function(modelValue) {
          var defer = $q.defer();
          Meteor.call('checkAvailableEmail',modelValue,function(error){
            if (error){              
              defer.reject();
            }else{
              defer.resolve();
            }
          });
          return defer.promise;
        }
      }
    };
    
  }  
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
    $translatePartialLoaderProvider.addPart('app/supplierComponents/proRegister');
  }

})();

