(function ()
{
    'use strict';


    var main = 'statement'; // Change this with containing folder name
    var type = 'Show';
    function ControllerFunction($scope){
      'ngInject';  
      var self = this;
      

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/adminComponents/forms/form/formView/formDetail/page/pageList/pageDetail/question/questionPreview/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      map:'<',
      marker: '<',
      location: '='           
    }
  });

})();
