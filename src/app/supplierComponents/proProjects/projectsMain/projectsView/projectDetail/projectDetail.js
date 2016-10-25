(function () {
  'use strict';

  var main = 'project'; // Change this with containing folder name
  var type = 'Detail'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  /**
   * 
   * 
   * @param {any} $scope
   * @param {any} $stateParams
   */
  function ControllerFunction($scope,$reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    ///////////Data///////////


    ///////////Methods Declarations///////////
    self.done = done;
    
    self.getQuestion = getQuestion;
    self.autorun(function(){      
      if(self.getReactively('currentProject')){        
        self.getQuestion('gmap');
      }

    });

    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {
      console.log('Form: ',self.currentForm);
      self.update(event);
    }    

      function getQuestion(qtype){            
      if(self.getReactively('currentProject').pages){
        angular.forEach(self.getReactively('currentProject').pages,function(value,i){          
         angular.forEach(value.questions,function(question,j){           
            if(question.questionType===qtype){
              console.log('found question:',question);
              self.question = question;
              self.location = question.answer;
                            
              $scope.$apply();                           
              return;
            }            
          });
        });
      }else{
        if(self.done){
                self.done({
                  $event:{
                    question:null,
                    error:"no map found mentioned..."
                  }
                });
              }
        return "no map found...";
      }

    }

  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'formServices',
      'projectGallery',  
      'projectMap',
      'projectOwnerContact',    
      'projectSummary',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        
        update: '&',
        currentProject: '=',       
        
      }
    });   

})();