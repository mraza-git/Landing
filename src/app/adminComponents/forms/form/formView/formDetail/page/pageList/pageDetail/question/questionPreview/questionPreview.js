(function () {
  'use strict';


  var main = 'question'; // Change this with containing folder name
  var type = 'Preview';

  function ControllerFunction($scope, questionSetup, $reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    ///////////Data///////////
    self.fields = [];
    // self.model = {};

    ///////////Methods Declarations///////////
    self.updateQuestion = updateQuestion;
    self.addQuestion = addQuestion;
    self.deleteQuestion = deleteQuestion;
    self.checkInit = checkInit;
    self.init = init;
    self.setup = setup;
    self.getTO = getTO; // add question templateOptions
    self.getFG = getFG; // add the question in a field group.
    self.getValidationMessages = getValidationMessages; // add validation messages
    self.getHideExpression = getHideExpression; // add Hide Expressions


    ///////////Method Definitions///////////
    self.checkInit();

    function checkInit() {
      if (angular.isUndefined(self.questions)) {
        var ep = 'false';
        var messages = self.getValidationMessages(self.question);
        var to = self.getTO(self.question)
        self.fields[0] = self.setup(self.question, ep, messages, to);
      } else {
        self.fields = [];
        init();
      }

    }

    function init() {
      angular.forEach(self.questions, function (question, index) {
        var ep = self.getHideExpression(question);
        var messages = self.getValidationMessages(question);
        var to = self.getTO(question)
        self.fields.push(self.setup(question, ep, messages, to))
      });
      console.log(self.fields);
    }

    function setup(questionMeta, ep, messages, to) {
      if (!questionMeta) {
        return false;
      }
      var fgObject = {
        key: questionMeta.adminKey,
        type: questionMeta.questionType,
        className: 'slide-down',
        templateOptions: to,
        validation: {
          messages: messages
        },
        hideExpression: ep
      };
      if (questionMeta.questionType === 'select') {
        fgObject.templateOptions.multiple = false;
      }
      return fgObject;
    }

    /////// Helper Methods ///////////

    function getFG() {

    }

    function getHideExpression(meta) {

      if (!meta.enableCL) {
        return 'false';
      } else if (angular.isUndefined(meta.conditions)) {
        return 'false';
      } else if (meta.conditions.length <= 0) {
        return 'false';
      } else {
        var epString = meta.hideShow + '(model.';
        angular.forEach(meta.conditions, function (value, index) {
          var answerWraper = "'";
          if (value.question.questionType === "checkbox")
            answerWraper = "";
          epString = epString + value.question.adminKey + value.operator + answerWraper + value.answer + answerWraper;
          if (meta.conditions.length > index + 1) {
            epString = epString + meta.anyAll + 'model.';
          }
        });
        epString = epString + ')';
        console.log(epString);

        return epString;
      }
    }

    function getTO(meta) {
      var toObject = {};
      toObject.label = meta.customerDescription;
      toObject.required = meta.requiredCheck;
      if(angular.isDefined(meta.options)){
        if (meta.options.length > 0) {
          toObject.options = meta.options;
          toObject.labelProp = 'value';
          toObject.valueProp = 'value';
        }
      }
      if(meta.questionType === 'textarea'){
        toObject.rows = 5;
        toObject.grow = false;
      }
      return toObject;
    }

    function getValidationMessages(meta) {
      var messages = {};
      if (angular.isDefined(meta.requiredCheck)) {
        if(meta.requiredCheck)
          messages.required = function (viewValue,modelvalue,scope){
            return 'This is a required field';
          }
      }
      return messages;
    }









    ////////////////////////////////////////////////////////
    function updateQuestion(event) {
      self.update({
        $event: {
          question: self.question,
          index: self.index,
          event: event,
        }
      });


    }

    function addQuestion(event, index) {
      self.update({
        $event: {
          question: undefined,
          index: index,
          event: event,
        }
      });
    }

    function deleteQuestion() {
      if (self.remove) {        
        self.remove({
          $event: {
            index: self.index
          }
        });
      }
    }


  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/adminComponents/forms/form/formView/formDetail/page/pageList/pageDetail/question/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'questionSetupService',
      'statementShow',
      'focGmap',
      'formly',
      'formlyMaterial',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        question: '<',
        questions: '<',
        index: '<',
        previewPage: '<',
        update: '&',
        remove: '&',
        formName: '=',
        model: '=',
      }
    }).run(run);

  function run(formlyConfig) {
    'ngInject';
    // Custom Option Create
    formlyConfig.setType({
      name: 'statement',
      template: '<statement-show statement="to.label"></statement-show>'
    });

    formlyConfig.setType({
      name: 'divider',
      template: '<md-divider></md-divider>'
    });

    formlyConfig.setType({
      name: 'gmap',
      template: '<foc-gmap key="options.key" location="model[options.key]" readonly="true" ></foc-gmap>'
    });

    formlyConfig.setType({
      name: 'budget',
      wrapper: ['label'],
      apiCheck: function (check) {
        return {
          templateOptions: {
            options: check.arrayOf(check.object),
            labelProp: check.string.optional,
            valueProp: check.string.optional,
            theme: check.string.optional
          }
        };
      },
      template: '<md-radio-group ng-model="model[options.key]" md-theme="{{to.theme}}">'+
                '<md-radio-button '+
                  ' ng-repeat="option in to.options"'+
                  ' ng-disabled="to.disabled"'+
                  ' ng-value="option[to.valueProp]">'+
                  ' {{option[to.labelProp]}}'+
                '</md-radio-button>'+
            '</md-radio-group>'
    });

    formlyConfig.setType({
      name: 'icon-radio',
      template: '<icon-radio key="options.type" options="to.options" selected-radio="model[options.key]" ></icon-radio>'
    });
  }

})();