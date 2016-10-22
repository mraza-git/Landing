(function() {
  'use strict';  

  function questionSetup($q) {
    'ngInject';

    ///////////Data///////////
    var defer = $q.defer();

    ///////////Methods Declarations///////////
    this.setup = setup;
    this.addTO = addTO; // add question templateOptions
    this.addInFG = addInFG; // add the question in a field group.
    this.addValidation = addValidation; // add validation messages
    this.addHideExpression = addHideExpression; // add Hide Expressions


    ///////////Methods Definition///////////
    function setup(questionMeta) {
      if (!questionMeta) {
        defer.reject({
          reason: "No meta found"
        });
      }
      console.log(questionMeta.questionType);      
      
      var fgObject = {
        key: questionMeta.adminKey,
        type: questionMeta.questionType,
        // className: 'slide-top',
        // templateOptions: this.addTO(questionMeta),
        // validation:{
        //   messages: this.addValidation(questionMeta)
        // },
        // hideExpression: this.addHideExpression(questionMeta)        
      };
      defer.resolve(fgObject);

      return defer.promise;      
    }

    /////// Helper Methods ///////////

    function addInFG() {

    }

    function addHideExpression(meta){
      if(!meta.enableCL){
        return false;
      }
      else if(!angular.isDefined(meta.conditions)){
        return false;
      }
      else if(meta.conditions.length>0){
        return false;
      }
      else{
        var epString = meta.hideShow +'(model.';        
        angular.forEach(meta.conditions,function(value,index){
          epString = spString + value.question.adminKey + value.operator + value.answer;
          if (meta.conditions.length> index){
            epString = epString + meta.anyAll;
          }
        });
        epString = epString + ')';
        return epString;
      }
    }

    function addTO(meta){
      var toObject = {};
      toObject.label = meta.customerDescription;
      toObject.required = meta.requiredCheck;
      if(meta.options.length>0){
        toObject.options = meta.options;
        toObject.labelProp = 'value';
        toObject.valueProp = 'value';
      }
      return toObject;
    }
    function addValidation(meta){
      var messages = {};
      if(meta.requiredCheck){
        messages.required = 'This is a required question';
      }
        return messages;
    }
    return {
      setup: this.setup
    };

  }

  angular.
  module('questionSetupService', [   
  ]).
  factory('questionSetup',questionSetup);
})();


