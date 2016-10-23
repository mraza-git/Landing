(function() {
  'use strict';


  var main = 'project'; // Change this with containing folder name
  var type = 'Budget';

  function ControllerFunction($scope, $reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    // self.subscribe('services');
    ///////////Data///////////
    self.colors = ['md-yellow-400-bg', 'md-orange-300-bg', 'md-orange-800-bg', 'md-red-600-bg', 'md-red-900-bg'];
    ///////////Methods Declarations///////////
    self.getQuestion = getQuestion;
    self.testGetQuestion = testGetQuestion;

    self.testGetQuestion();

    ///////////Method Definitions///////////
    function getQuestion(){
      if(self.thread.pages){
        angular.forEach(self.thread.pages,function(value,i){
          if(self.question)
            return;
         angular.forEach(value.questions,function(question,j){
            if(question.questionType==="budget"){
              self.question = question;
              self.index = question.options.map(function(obj,index){
                if(obj.value === question.answer){
                  return index;
                }
              }).filter(isFinite)[0];                            
              if(self.done){
                self.done({
                  $event:{
                    question:self.question,
                    index: self.index, 

                  }
                });
              }
              return;
            }
          });
        });
      }else{
        if(self.done){
                self.done({
                  $event:{
                    question:null,
                    error:"no budget mentioned..."
                  }
                });
              }
        return "no budget mentioned...";
      }

    }
    function testGetQuestion(){
      self.getQuestion()
    }

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/projectsList/' + name + '/' + name + '.html';  
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', 'thumbImage' ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        thread: '<',        
        done: '&' 
      }
    });


})();
