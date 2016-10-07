

function CreateQuestionDialogController($mdDialog, selectedQuestion, questions, index) {
  var vm = this;

  // Data
  vm.question = {};
  vm.templist=[];
  vm.tempQuestion={};
  // if Edit
  if (angular.isDefined(selectedQuestion)) {
    vm.question = angular.copy(selectedQuestion);
    vm.tempQuestion = angular.copy(vm.question);
    vm.templist = angular.copy(questions);
    vm.edit = true;
  } else {
    vm.question.description = 'Question ' + (index).toString();
  }

  if (angular.isDefined(questions)) {
    vm.questions = angular.copy(questions);
  } else {
    questions = [];
    vm.questions = [];
  }
  var messages = {
    required: function(viewValue, modelValue, scope) {
      return scope.to.label + ' is required';
    },
    maxlength: function(viewValue, modelValue, scope) {
      return scope.to.label + ' should be no more than ' + scope.to.maxlength;
    },
    minlength: function(viewValue, modelValue, scope) {
      return scope.to.label + ' should be at least ' + scope.to.minlength;
    },
  };

  var annimationClass = "slide-down";
  var questionTypes = [{
    'id': 1,
    'label': 'radio'
  }, {
    'id': 2,
    'label': 'checkbox'
  }, {
    'id': 3,
    'label': 'input'
  },{
    'id': 4,
    'label': 'statement'
  },{
    'id': 5,
    'label': 'divider'
  },

];  


  vm.fields = [{
      key: 'customerDescription',
      type: 'input',
      defaultValue: 'This will be shown to customer',
      templateOptions: {
        label: 'Customer Description',
        required: true,
        maxlength: 150,
        minlength: 5,
      },
      validation: {
        messages: messages,
      },
    }, {
      key: 'supplierDescription',
      type: 'input',
      defaultValue: 'This will be shown to supplier',
      templateOptions: {
        label: 'Supplier Description',
        required: true,
        maxlength: 150,
        minlength: 5,
      },
      validation: {
        messages: messages,
      },
    },
    {
      elementAttributes: {
        layout: 'row',
        'layout-sm': 'column',
        'layout-align': 'space between center',
      },
      fieldGroup: [
        {
          key: 'requiredCheck',
          type: 'checkbox',
          className: 'flex-50',
          defaultValue: false,
          templateOptions: {
            label: 'Will this be a required question?',
          },
          validation: {
            messages: messages,
          },
        },
        {
          key: 'adminKey',
          type: 'input',
          className: 'flex-15',
          defaultValue: 'key'+index.toString(),
          templateOptions: {
            label: 'adminKey',
            required: true,
            placeholder: 'should be in camelCase',
            disabled: true,
          },
          hideExpression: 'model.requiredCheck',
        },
        {
          key: 'questionType',
          type: 'select',
          className: 'flex-35',
          defaultValue: 'radio',
          templateOptions: {
            label: 'Select question Type',
            // required: true,
            options: questionTypes,
            labelProp: 'label',
            valueProp: 'label',
          },
          validation: {
            messages: messages,
          },
        },
      ]
    },
    {
      key: 'options',
      type: 'optionCreate',
      className: annimationClass,
      templateOptions:{
        co: vm.question.options,
        model: vm.question.options,
        data: function(event){
          vm.question.options = event.data;
        },
      },
      hideExpression: 'model.questionType !== "radio"',
    },
    {
      template: '<md-divider></md-divider>',
    },
    {
      template: '<h2 class="conditional-logic">Conditional Logic: </h2>',
    },
    {
      elementAttributes: {
        layout: 'row',
        'layout-sm': 'column',
        'layout-align': 'space between center',
      },
      fieldGroup:[
        {
          key:'enableCL',
          type:'checkbox',
          className: 'flex',
          templateOptions: {
          label: 'Enable/Disable Conditional logic for this question',
          },
          expressionProperties:{
            "templateOptions.disabled": "model.questionType==='statement'||model.questionType==='divider'"
          }
        },
        
      ]


    },
    // Conditional Logic related
    {
      elementAttributes: {
        layout: 'row',
        'layout-sm': 'column',
        'layout-align': 'start',
      },
      fieldGroup:[
        {
          key: 'hideShow',
          type: 'select',
          className: 'flex-30 '+annimationClass,
          templateOptions: {
            label: 'hide/show',

            options: [
              {'id':'!','label':'Show'},
              {'id':'','label':'Hide'}
            ],
            labelProp: 'label',
            valueProp: 'id',
            placeholder:'Hide/Show',
          },
          hideExpression: '!model.enableCL',
          validation: {
            messages: messages,
          },
        },
        {
          className:'flex-15 '+annimationClass,
          hideExpression: '!model.enableCL',
          template: '<span> this field if </span>'
        } ,
        {
          key: 'anyAll',
          type: 'select',
          className: 'flex-15 '+annimationClass,
          templateOptions: {
            label: 'hide/show',
            options: [
              {'id':'||','label':'Any'},
              {'id':'&&','label':'All'}
            ],
            labelProp: 'label',
            valueProp: 'id',
            placeholder:'Any/All',
          },
          hideExpression: '!model.enableCL',
          validation: {
            messages: messages,
          },
        },
        {
          className: 'flex-40 '+annimationClass,
          hideExpression: '!model.enableCL',
          template: '<span> of this matches the following: </span>'
        } ,
      ]
    },
    {
      key: 'conditions',
      type: 'conditionCreate',
      className: annimationClass,
      templateOptions:{
        cc: vm.question.conditions,
        questions:vm.questions,
        data: function(event){
          vm.question.conditions = event.data;
        },
      },
      hideExpression: '!model.enableCL',
    },
  ];


  // Methods
  vm.closeDialog = closeDialog;
  vm.save = save;
  vm.remove = remove;
  vm.addCLLogic = function (){
    console.log(vm.clFields);
    var fields = angular.copy(vm.clFields);
    //
    vm.fields.push(fields);
  };

  //////////
  function save() {
    if (vm.edit) {
      var newArray = questions.map(function(item) {
        return item === selectedQuestion ? vm.question : item;
      });
      vm.questions = newArray;
      vm.closeDialog(vm.questions, vm.question);
    } else {
      // insert at index            
      vm.questions.insert(vm.question, index);
      vm.closeDialog(vm.questions, vm.question);
    }
  }

  function remove() {
    if (vm.edit) {
      questions.splice(questions.indexOf(selectedQuestion), 1);
    }
    $mdDialog.hide(questions, undefined);
  }

  function closeDialog(questions, question) {
    $mdDialog.hide(questions, question);
  }

}
