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
    self.subscribe('quoteByLeadId',function(){
      if(angular.isDefined(self.getReactively('currentProject'))){
        return[
          [self.getReactively('currentProject')._id]
        ]
      }
      else [[]];      
    },function(){
      self.loading = false;    
    });  

    self.helpers({
      currentUser: function(){
        return Meteor.user();
      },
      quote: function(){
        if(angular.isDefined(self.getReactively('currentProject'))){
          var quote = Quotes.findOne({
            leadId: self.currentProject._id,
            owner: Meteor.userId()
          });
          return quote;
        }
        else return {};
      },
      isFavorite: function(){
        return _.contains(self.getReactively('currentUser.business.favorites'),self.getReactively('currentProject._id'));
      }      
    });


    ///////////Methods Declarations///////////
    self.done = done;    
    self.getQuestion = getQuestion;
    self.setFavorite = setFavorite;



    ///////////Method Definitions///////////
    function setFavorite(){
      if(self.isFavorite){
        Meteor.users.update(self.currentUser._id,
        {
          $pull:
          {
            'business.favorites': self.currentProject._id
          }
        }
        );
      }else{
        Meteor.users.update(self.currentUser._id,
        {
          $push:
          {
            'business.favorites': self.currentProject._id
          }
        }
        );
      }

    }    
    self.autorun(function(){      
      if(self.getReactively('currentProject')){        
        self.getQuestion('gmap');
      }

    });
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {      
      self.update(event);
    }    

      function getQuestion(qtype){            
      if(self.getReactively('currentProject').pages){
        angular.forEach(self.getReactively('currentProject').pages,function(value,i){          
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
      'drop-ng'
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        ready: '<',
        update: '&',
        currentProject: '=',       
        
      }
    });   

})();