(function () {
  'use strict';


  var main = 'question'; // Change this with containing folder name
  var type = 'List';

  function ControllerFunction($scope,$mdDialog, $mdMedia) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;


    ///////////Data///////////


    ///////////Methods Declarations///////////
    self.done = done;
    self.openQuestionUpdateModal = openQuestionUpdateModal;
    self.openAddQuestionModal = openAddQuestionModal;



    ///////////Method Definitions///////////
    function done(event) {
      angular.forEach(self.questions,function(value,index){
        self.questions[index].adminKey = 'key'+index;
      });
      self.update(event);
    }

    function openQuestionUpdateModal(ev) {
      self.openAddQuestionModal(ev);
    }

    function openAddQuestionModal(ev) {
      $mdDialog.show({
        controller: CreateQuestionDialogController,
        controllerAs: 'question',
        locals: {
          selectedQuestion: ev.question,
          questions: self.questions,
          index: ev.index,
        },
        templateUrl: 'app/adminComponents/forms/form/modalBoxes/questionCreate-dialog/questionCreate-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev.event,
        clickOutsideToClose: true,
        fullscreen: $mdMedia('sm') || $mdMedia('xs'),
      }).then(function (questions, question) {
        if (questions) {
          self.questions = questions;
          self.currentQuestion = question;          
          self.done();
        }
      });
    }

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/adminComponents/forms/form/formView/formDetail/page/pageList/pageDetail/question/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',      
      'questionPreview',
      'newPlaceholder',
      'optionCreate',
      'conditionCreate',
      'dndLists',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        questions: '=',
        update: '&',
        previewPage:"<",
      }
    }).run(run);

  function run(formlyConfig) {
    'ngInject';
    // Custom Option Create
    formlyConfig.setType({
      name: 'optionCreate',
      template: '<option-create type="to.type" options=model[options.key] update="to.data($event)"></option-create>'
    });

    // Custom Condition Create
    formlyConfig.setType({
      name: 'conditionCreate',
      template: '<condition-create conditions="to.cc" questions="to.questions" update="to.data($event)"></condition-create>'
    });
  }

})();