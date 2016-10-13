(function ()
{
    'use strict';


    var main = 'condition'; // Change this with containing folder name
    var type = 'Create';
    /**
     * 
     * 
     * @param {any} $scope
     */
    function ControllerFunction($scope){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      if(!self.conditions){
        self.conditions = [];
      }

      ///////////Data///////////
      self.operators=[
        {'id':'===','label':'is'},
        {'id':'!==','label':'is not'}
      ];

      ///////////Methods Declarations///////////
      self.done = done;
      self.addCondition = addCondition;
      self.removeCondition = removeCondition;

      if(self.conditions.length===0){
        self.conditions.push({question:{},answer:"",operator:""});
        self.done();
      }



      ///////////Method Definitions///////////
      $scope.$watch('conditions',function(newValue,oldValue){
        self.done();
      });

      /**
       * Update the data in parent component
       */
      function done(){
        // var conditions = self.conditions;
        // if( self.conditions.length>=1 ) {
        //   conditions = [];
        //   angular.forEach(self.conditions,function(value,index){            
        //     var original = angular.copy(value.question);
        //     var operator = value.operator;
        //     var answer = value.answer;
        //     var question = {};
        //     question.questionType = original.questionType;
        //     question.options = original.options;
        //     question.adminKey = original.adminKey;
        //     conditions.push({question:question,answer:answer,operator:operator});
        //   });
        // }
        // console.log(conditions);
        
        self.update({
          $event: {
            data: self.conditions
          }
        });
      }
      /**
       * Adds an empty condition
       * 
       * @param {any} index
       */
      function addCondition(index){
        self.conditions.insert({question:{},answer:"",operator:""},index+1);
        self.done();
      }
      /**
       * Removes a condition.
       * 
       * @param {any} index
       */
      function removeCondition(index){
        self.conditions.splice(index,1);
        self.done();
      }


    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/adminComponents/forms/form/formView/formDetail/page/pageList/pageDetail/question/questionList/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'dndLists',
    ])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      conditions:'=',
      questions: '=',
      update: '&',
    }
  });

})();
