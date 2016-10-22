(function ()
{
    'use strict';


    var main = 'lead'; // Change this with containing folder name
    var type = 'Summary';
    function ControllerFunction($scope,$reactive,$cookies,AuthModals,$mdToast,$state,serviceName){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      
      ///////////Data///////////
      self.lead = $cookies.getObject('foc.lead');
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
      });
      

    
      ///////////Methods Declarations///////////
      self.startSave = startSave;
      self.saveLead = saveLead;   
      self.login = login;
      self.register = register;
      self.uploadedPictures = uploadedPictures;

      


      ///////////Method Definitions///////////
      function startSave(){
        self.okToSave=true;
      }
      function saveLead(){    
        var lead = angular.copy(self.lead);    
        Leads.insert(lead,function(err,id){
          if(err){
            console.log("error saving request..>",err);
          }else{
            console.log('document saved:',id);
            $cookies.remove('foc.lead');
            $mdToast.show(
              $mdToast.simple()
              .textContent('Your inquiry is published successfully')               
              .position('top right')
              .action('x')
              .hideDelay(5000)
            );
          }
        });

        // $state.go('app.landing');

      }
      function login(event){
        AuthModals.openLoginModal(event);
      }
      function register(){
        AuthModals.openRegisterModal(event);
      }
      function uploadedPictures(event){
        self.lead.images = event.images;
        // self.saveLead();

        angular.forEach(event.images,function(value,index){
          Images.remove(value.id);
          console.log("Removing: ",value.url);
        });
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
