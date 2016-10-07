(function ()
{
    'use strict';

    var main = 'page'; // Change this with containing folder name
    var type = 'Detail'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

    function ControllerFunction($scope, $stateParams){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      if($stateParams.itemId){
        self.itemId = $stateParams.itemId;
      }
      ///////////Data///////////


      ///////////Methods Declarations///////////
      self.done = done;



      ///////////Method Definitions///////////
      function done(event){
        console.log('Page: ', self.page);
        self.update();
      }

    }

  var name = main + type;
  var templateUrl = 'app/focComponents/forms/form/formView/formDetail/page/pageList/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',
    'questionList',
  ])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      page:'=',
      update: '&',
      previewPage:'<',
    }
  })

})();
