(function ()
{
    'use strict';


    var main = 'demo'; // Change this with containing folder name
    var type = 'List';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;


      ///////////Data///////////


      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/adminComponents/forms/' + main + '/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, ['angular-meteor',])
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
  var template = '<'+main+'-'+type.toLowerCase()+'></'+main+'-'+type.toLowerCase()+'>';
  var state = 'app.'+name;
  var stateUrl = '/'+name;
  var views = {
    'content@app': {
      template: template,
    },
     // create additional views if required
     // 'main@':{
     //   templateUrl: 'app/core/layouts/content-with-toolbar.html',
     //   controller: 'MainController as vm'
     // },
     // 'toolbar@app.component':{
     //   templateUrl: 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
     //   controller: 'ToolbarController as vm'
     // },
     //
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
