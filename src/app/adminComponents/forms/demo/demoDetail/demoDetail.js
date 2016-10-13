(function ()
{
    'use strict';

    var main = 'demo'; // Change this with containing folder name
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



      ///////////Method Definitions///////////



    }

  var name = main + type;
  var templateUrl = 'app/adminComponents/forms/' + main + '/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, ['angular-meteor',])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      itemId:'<',
      output: '&',
    }
  })
  .config(config);

  var template = '<'+main+'-detail></'+main+'-detail>';
  var state = 'app.'+name;
  var stateUrl = '/'+name + '/:itemId';
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
      // params: {
      //       itemId: '',
      //
      //   },
    });

  }

})();
