(function ()
{
    'use strict';


    var main = 'pro'; // Change this with containing folder name
    var type = 'Faq';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;


      ///////////Data///////////


      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + (type?type:''); // Change This with Component Name
  var templateUrl = 'app/supplierComponents/pages/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',  
    'pagesToolbar',    

    ])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      input:'<',
      output: '&',
    }
  })
  .config(config);
  var template = '<'+main+ (type?'-':'')+(type?type.toLowerCase():'')+'></'+main+(type?'-':'')+(type?type.toLowerCase():'')+'>';
  var state = 'app.'+name;
  var stateUrl = '/pro/'+type.toLowerCase();
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as self"
    },
    'content@app.proFaq': {
      template: template,
    },     
    'toolbar@app.proFaq':{
      template: '<pages-toolbar></pages-toolbar>',
      
    },
     
  };
  /** @ngInject */
  function config($stateProvider)
  {
    // State
    $stateProvider
    .state(state, {
      url    : stateUrl,
      views  : views,

    });
  }

})();
