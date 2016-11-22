(function ()
{
    'use strict';


    var main = 'profile'; // Change this with containing folder name
    var type = false;
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////      
      $reactive(this).attach($scope);

      ///////////Data///////////
      this.subscribe('userById',function(){
        return [
          [Meteor.userId()]
        ]
      });

      ///////////Methods Declarations///////////
      this.helpers({
        user:function(){
          return Meteor.user();
        }
      });



      ///////////Method Definitions///////////

    }

  var name = type?main+type:main; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',  
    'pagesToolbar',   
    'landingFooter',

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
  var stateUrl = '/profile';
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as self"
    },
    'content@app.profile': {
      template: template,
    },     
    'toolbar@app.profile':{
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
