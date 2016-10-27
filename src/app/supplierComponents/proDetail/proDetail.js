(function ()
{
    'use strict';


    var main = 'pro'; // Change this with containing folder name
    var type = 'Detail';
    function ControllerFunction($scope,$reactive,$stateParams,$mdToast,$state){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      self.selectedServices = [];
      ///////////Subscriptions///////////      
      self.subscribe("userById",function(){
        return [
            [self.getReactively('userId')]
          ];
      },function(){
        self.ready=true;
        self.isSupplier = Roles.userIsInRole(Meteor.userId(),['supplier','admin'],'supplier-group');
        self.user = Meteor.user();
        if(!self.user){
          console.log("you need to log in to update your profile....");
          $mdToast.show(
                $mdToast.simple()
                .textContent('you need to log in to update your profile....')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
          $state.go('app.landing');
          return;
        }        
        if(!self.isSupplier){
          $mdToast.show(
                $mdToast.simple()
                .textContent('you need a supplier login to update your supplier profile....')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
          $state.go('app.landing');
          return;
        }

      });
      self.helpers({
        userId: function(){
          return Meteor.userId();
        },        
        user: function(){
          return Meteor.users.findOne(self.getReactively('userId'));
        },
        services: function(){
          return Services.find().fetch().map(function(obj){            
                obj._lowername = obj.name.toLowerCase();
                if(obj.description)
                  obj._lowerdescription = obj.description.toLowerCase();
                else{
                  obj._lowerdescription =" ";
                }
                return obj;
          });
        }
      });

      if(!!self.getReactively('userId')){        
        self.helpers({
        });        
      }else{
        
      }
      
      ///////////       Data         ///////////
      

      ///////////Methods Declarations///////////      
      self.querySearch = querySearch;
      self.createFilterFor = createFilterFor;
      self.updateUserInfo = updateUserInfo;


      ///////////Method Definitions///////////      
      /**
       * Search for services.
       */
      function querySearch (query) {
        var results = query ? self.services.filter(self.createFilterFor(query)) : [];
        return results;
      }

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        return function filterFn(service) {
          return (service._lowername.indexOf(query) === 0) ||
            (service._lowerdescription.indexOf(query) === 0)
        };

      }

      function updateUserInfo(){
        console.log("cannot update now...");
        return;
        var serviceIds = self.selectedServices.map(function(obj){
          return obj._id;
        });
        self.user.serviceIds = serviceIds || [];
        Meteor.users.update(
          {_id:self.userId},
          {
            $set:
            {              
                profile:self.user.profile,
                business:self.user.business,               
              
            }
          },
          function(error,doc){
            if(error){
              console.log(error);
            }else{
              console.log('records updated:',doc);
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
    'proRegister',
    'ngMessages',
    'focGmap',
    'thumbImage'

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
      // resolve:{
      //   isLoggedIn:function(){
      //     return 
      //     self.subscribe("userById",function(){
      //         return [
      //             [self.getReactively('userId')]
      //           ];
      //       },function(){
      //         self.ready=true;
      //         if(Meteor.userId()){
      //           return Meteor.userId();
      //         }else{
      //           throw new Error("AUTH_REQUIRED");
      //         }
      //       });          
      //   }
      // }

    });
    $translatePartialLoaderProvider.addPart('app/supplierComponents/proDetail');
  }

})();

