(function () {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'Preview'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,WizardHandler,$state,$stateParams,$cookies,$timeout) {
    'ngInject';
    ///////////Data///////////
    var self = this;    
    self.valid = [];
    self.previousStep = 0;
    self.serviceForm = [];
    self.formIndex = 0;

    self.originalForm = angular.copy(self.form);
    

    ///////////Methods Declarations///////////
    self.finishedWizard = finishedWizard;
    self.exitValidation = exitValidation;
    self.setupLead = setupLead;
    self.setupModel = setupModel;


    if(angular.isDefined(self.lead)){
      self.setupModel();
    }
    

    ///////////Method Definitions///////////
    function finishedWizard() {            
      self.setupLead();
    }

    function setupLead(){      
      self.lead = {pages:[{questions:[]}]};
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
      self.lead.createdAt = new Date();      
      self.lead.serviceId = self.service._id;
      self.lead.formId = self.form._id;      
      
      sessionStorage.setItem('foc.lead',angular.toJson(self.lead));
      
      $timeout(function(){
        $state.go('app.leadSummary');
      },500);
      
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
      'leadSummary',
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