(function ()
{
    'use strict';


    var main = 'option'; // Change this with containing folder name
    var type = 'Create';
    function ControllerFunction($mdDialog,$mdMedia){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      if(!self.options){
        self.options = [];
      }

      ///////////Data///////////

      ///////////Methods Declarations///////////
      self.done = done;
      self.addOption = addOption;
      self.removeOption = removeOption;

      if(self.options.length===0){
        self.options.push({value:'Option Text'});
        self.done();
      }



      ///////////Method Definitions///////////
      function done(){
        self.update({
          $event: {
            data: self.options,
          }
        });
      }
      function addOption(index){
        self.options.insert({value:'New...'},index+1);
        self.done();
      }
      function removeOption(index){
        self.options.splice(index,1);
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
      options:'=',
      update: '&',
      model: '=',
    }
  });

})();
