(function ()
{
    'use strict';


    var main = 'pro'; // Change this with containing folder name
    var type = 'Login';
    function ControllerFunction($scope,$reactive,$state){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      ///////////Data///////////
      self.form = {};    
      
            

      ///////////Methods Declarations///////////
      self.login = login;     


      ///////////Method Definitions///////////
      
      // function checkEmail(){
      //   return Accounts.findUserByEmail(self.form.email);
      // }

      function login(){
        self.loading = true;
        Meteor.loginWithPassword(self.form.email, self.form.password,
            function (err) {
              if (err) {
                self.error = err.reason;
                self.loading = false;
              } else {
                console.log("Logged In");
                self.loading = false;
                $state.go('app.p',{username: Meteor.user().username});
              }
            }
          );       
        
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
  .directive('emailExists',email);

  var template = '<'+main+ (type?'-':'')+(type?type.toLowerCase():'')+'></'+main+(type?'-':'')+(type?type.toLowerCase():'')+'>';
  var state = 'app.'+name;
  var stateUrl = '/pro/'+type.toLowerCase();
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-only.html',
          controller: "MainController as self"
    },
    'content@app.proLogin': {
      template: template,
    },     
     
  };

  function email($q){
    'ngInject';
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.emailExists = function(modelValue) {
          var defer = $q.defer();
          Meteor.call('checkAvailableEmail',modelValue,function(error){
            if (error){                            
              defer.resolve();
            }else{
              defer.reject();
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
    $translatePartialLoaderProvider.addPart('app/supplierComponents/proLogin');
  }

})();

