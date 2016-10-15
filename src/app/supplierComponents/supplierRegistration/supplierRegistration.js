(function ()
{
    'use strict';


    var main = 'supplier'; // Change this with containing folder name
    var type = 'Registration';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      

      ///////////Data///////////
      

      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + (type?type:""); // Change This with Component Name
  var templateUrl = 'app/supplierComponents/' + name + '/' + name + '.html';
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
  var state = 'app.'+name.toLowerCase();
  var stateUrl = '/'+name.toLowerCase();
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-only.html',
          controller: "MainController as self"
    },
    'content@app.supplierregistration': {
      template: template,
    },     
     
  };
  /** @ngInject */
  function config($stateProvider,$translatePartialLoaderProvider)
  {
    // State
    $stateProvider
    .state(state, {
      url    : stateUrl,
      views  : views,
      bodyClass: 'register',

    });
    $translatePartialLoaderProvider.addPart('app/supplierComponents/supplierRegistration');
  }

})();

