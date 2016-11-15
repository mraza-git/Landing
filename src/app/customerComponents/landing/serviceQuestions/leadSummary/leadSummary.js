(function ()
{
    'use strict';


    var main = 'lead'; // Change this with containing folder name
    var type = 'Summary';
    function ControllerFunction($scope,$reactive,AuthModals,$mdToast,$state,serviceName,leadSessionService,returnUrlService){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      
      ///////////Data///////////
      leadSessionService.get().then(function(res){
      self.lead = res;      
      },function(err){
        console.log(err);
      });

      returnUrlService.get().then(function(res){
        self.returnUrl = res;
      },function(err){
        self.returnUrl = {
          stateName: 'app.landing',
          stateParams: {}
        };

      });
      
      self.okToSave = false;
      if(self.lead){
        console.log("lead: ", self.lead);                
      }
      self.cropSettings = {aspectRatio: 1, resultImageSize: {w:300,h:300}, crop:true, areaType:'circle'};

      self.helpers({
        isLoggedIn: function (){
          return !!Meteor.userId();
        },
         service: function (){
          var service = Services.findOne(self.getReactively('lead.serviceId'));
          if(service){
            serviceName.set(service);
          }
          return service;
        },         
        userId: function(){
          return Meteor.userId();
        },
        isAdmin: function(){
          return Roles.userIsInRole(self.getReactively('userId'),'admin','default-group');
        }
      });
      

    
      ///////////Methods Declarations///////////
      self.startSave = startSave;
      self.saveLead = saveLead;   
      self.login = login;
      self.register = register;
      self.uploadedPictures = uploadedPictures;

      


      ///////////Method Definitions///////////      
      function startSave(){
        var lead = angular.copy(self.lead);
        if(lead._id){          
          if(lead.owner!==self.userId && !self.isAdmin){
            $mdToast.show(
                $mdToast.simple()
                .textContent('Only the owner of this inquiry can update it.')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
                );                
                return;
          }
        }
        if(self.isLoggedIn){
          self.okToSave = true;
        }else{
          console.log("there is still some problem in logging you in please login again.");
        }
      }
      function saveLead(){    
        var lead = angular.copy(self.lead); 
        if(lead._id){
          delete lead._id;
          if(lead.owner!==self.userId && !self.isAdmin){
            $mdToast.show(
                $mdToast.simple()
                .textContent('Only the owner of this lead can update it.')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
                );                
                return;
          }
          lead.updatedBy = self.userId;
          Leads.update(
            {
              _id: self.lead._id
            },
            {
              $set: lead,
            },
            function(err,doc){
              if(err){
                console.log(err);                
              }
              else{
                sessionStorage.clear();
                $mdToast.show(
                $mdToast.simple()
                .textContent('Your inquiry is updated successfully')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
                );
                $state.go(self.returnUrl.stateName,self.returnUrl.stateParams);
              }
            }
          );

        }else{
          lead.owner = self.userId;
          Leads.insert(lead,function(err,id){
            if(err){
              console.log("error saving request..>",err);
            }else{
              console.log('document saved:',id);
              // $cookies.remove('foc.lead');
              sessionStorage.clear();
              $mdToast.show(
                $mdToast.simple()
                .textContent('Your inquiry is published successfully')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
              $state.go(self.returnUrl.stateName,self.returnUrl.stateParams);
            }
          });
        }   


      }
      function login(event){
        AuthModals.openLoginModal(event);
      }
      function register(){
        AuthModals.openRegisterModal(event);
      }
      function uploadedPictures(event){
        //setup lead images
        if(!self.lead.images){
          self.lead.images = []
        }
        // if new images uploaded
        if(angular.isDefined(event.images)){
          self.lead.images.insertArray(0,event.images);
        }
        self.saveLead();
      }

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/landing/serviceQuestions/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
      'angular-meteor',
      'questionsToolbar',   
      'AuthModals',
      'filesUpload',
      'imageUpload',
      'ServiceNameModule',
      'leadSessionStorage',
      'returnUrlModule',
      'projectGallery',
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
  var stateUrl = '/'+name;
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
