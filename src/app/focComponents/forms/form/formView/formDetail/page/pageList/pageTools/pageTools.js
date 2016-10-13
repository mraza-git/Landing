(function() {
  'use strict';

  var main = 'page'; // Change this with containing folder name
  var type = 'Tools'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    self.keepOpen = true;
    self.previewPage = false;


    ///////////Methods Declarations///////////
    self.addpage = addpage;
    self.addquestion = addquestion;
    


    ///////////Method Definitions///////////
    function addpage(event){
      self.addPage({event:{}});
    }
    function addquestion(event){
      self.addQuestion({event:{}});
    }

  }

  var name = main + type;
  var templateUrl = 'app/focComponents/forms/form/formView/formDetail/page/pageList/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, ['angular-meteor', ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        addPage: '&',
        addQuestion: '&',
        deletePage: '&',
        delteteQuestion: '&',
        editPage: '&',
        previewPage:'=',
      }
    });


})();
