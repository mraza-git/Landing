(function () {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'Preview'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,WizardHandler,$state) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    self.model = [];
    self.lead = {pages:[{questions:[]}]};
    self.originalForm = angular.copy(self.form);


    ///////////Methods Declarations///////////
    self.finishedWizard = finishedWizard;
    self.exitValidation = exitValidation;
    self.setupLead = setupLead;



    ///////////Method Definitions///////////
    function finishedWizard() {      
      self.setupLead();
    }

    function setupLead(){
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
      self.lead.owner = Meteor.userId();
      $state.go('app.leadSummary',{lead:JSON.stringify(self.lead)});
      
    }

    function exitValidation(form) {
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

      self.valid = form && !form.$invalid;
      return self.valid;
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
        service: '<',
      }
    });


})();