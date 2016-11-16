(function () {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'Preview'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,WizardHandler,$state,leadSessionService) {
    'ngInject';
    ///////////Data///////////
    var self = this;    
    self.valid = [];
    self.previousStep = 0;
    self.serviceForm = [];
    self.formIndex = 0;
    $reactive(self).attach($scope);

    self.originalForm = angular.copy(self.form);
    

    ///////////Methods Declarations///////////
    self.finishedWizard = finishedWizard;
    self.exitValidation = exitValidation;
    self.setupLead = setupLead;
    self.setupModel = setupModel;

    self.autorun(function(handle){
      if(self.getReactively('lead')){
        self.setupModel();
        handle.stop();
      }else if(self.getReactively('model')){
        handle.stop();
      }
      else{
        leadSessionService.get().then(function(res){
            if(res){
              self.lead = res;
              self.setupModel();
              handle.stop();
            }
          },function(err){

          });
      }
    });


    

    ///////////Method Definitions///////////
    function finishedWizard() {            
      self.setupLead();
    }

    function setupLead(){
      if(!self.lead){
        self.lead = {pages:[{questions:[]}]};
        self.lead.createdAt = new Date();      
        self.lead.serviceId = self.service._id;
        self.lead.formId = self.form._id;      
      }else{
        self.lead.updatedAt = new Date();
      }      
      angular.forEach(self.model,function(value,vindex){
        self.lead.pages[vindex] = {questions:[]};        
         angular.forEach(value,function(val,key){           
           var question = self.form.pages[vindex].questions.find(function(obj){
             return obj.adminKey === key;
           });
                      
           question.answer = val;
           self.lead.pages[vindex].questions.push(question);
         });
      });
      
      leadSessionService.set(self.lead);
      $state.go('app.leadSummary');
      
      // find a way to save using a promise.
      
    }

    function setupModel(){      
      self.model=[{}];
      angular.forEach(self.lead.pages,function(value,vindex){        
        self.model[vindex]={};
        angular.forEach(value,function(val,hindex){          
          angular.forEach(val,function(v,index){
            self.model[vindex][v.adminKey]=v.answer;            
          });
        });
      });
      console.log("Revamped Model",self.model);
    }

    function exitValidation(form,index) {
      var cs = WizardHandler.wizard().currentStepNumber();
      var ts = WizardHandler.wizard().totalStepCount();
      // if(vm.previousStep > cs ){
      //   // back;
      //   vm.previous = true;
      //   vm.next = false;
      // }
      // else{
      //   // next
      //   vm.previous = false;
      //   vm.next = true;
      // }
      self.last = cs === ts ? true : false;
      self.first = cs === 1 ? true : false;

      self.previousStep = cs;
      

      self.valid[index] = form && !form.$invalid;
      return self.valid[index];
    }

  }

  var name = main + type;
  var templateUrl = 'app/customerComponents/landing/serviceQuestions/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'mgo-angular-wizard',
      'questionPreview',
      'leadLocation',
      'leadSummary',      
      'leadSessionStorage',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        form: '=',
        service:'<',
        lead:'=',
      }
    });


})();