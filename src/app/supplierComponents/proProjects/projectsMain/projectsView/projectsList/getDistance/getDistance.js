(function() {
  'use strict';


  var main = 'get'; // Change this with containing folder name
  var type = 'Distance';

  function ControllerFunction($scope, $reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    // self.subscribe('services');
    ///////////Data///////////
    
    
    ///////////Methods Declarations///////////
    self.getQuestion = getQuestion;
    self.getQuestion('gmap');
    
    




    ///////////Method Definitions///////////
    self.autorun(function(){    
      self.distance = parseInt(getDistance(self.getReactively('location'),Meteor.user().business.address.location)/1000);
    })

    
    function getQuestion(qtype){            
      if(self.getReactively('lead').pages){
        angular.forEach(self.getReactively('lead').pages,function(value,i){          
         angular.forEach(value.questions,function(question,j){           
            if(question.questionType===qtype){              
              self.question = question;
              self.location = question.answer;                            
              // $scope.$apply();                           
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
        lead: '<',
      }
    });


})();
