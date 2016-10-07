(function ()
{
    'use strict';


    var main = 'new'; // Change this with containing folder name
    var type = 'Placeholder';
    function ControllerFunction(){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      console.log(self.index);
      if(self.index=== 0){
        self.showButton = "hover";
      }else{
        self.showButton="";
      }


      ///////////Data///////////
      self.hoverButton=false;

      ///////////Methods Declarations///////////
      self.newQuestion = newQuestion;
      self.isHover = isHover;

      ///////////Method Definitions///////////
      function newQuestion(event){
        self.update({
          $event:{
            question : undefined,
            index: self.index,
            event: event,
          }
        });
      }
      function isHover(state){
        self.hoverButton = state;
      }

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/focComponents/forms/form/formView/formDetail/page/pageList/pageDetail/question/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, ['angular-meteor',])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      index:'<',
      update:'&',
    }
  });

})();
