(function ()
{
    'use strict';


    var main = 'partner'; // Change this with containing folder name
    var type = 'List';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;


      ///////////Data///////////


      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + (type?type:""); // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/' + name + '/' + name + '.html';
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
  var stateUrl = '/'+main+'-'+type.toLowerCase();
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as self"
    },
    'content@app.partnerlist': {
      template: template,
    },     
    'toolbar@app.partnerlist':{
      template: '<landing-toolbar></landing-toolbar>',
      
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
  $(function()
{
  $('.food > .info > .content .stars')
    .bind('mousemove', function(e)
    {
      var pct = e.pageX - $(this).offset().left;
          pct = pct / $(this).width() * 100;
      $(this).find('> em').css('width', pct + '%');
    })
    .bind('mouseleave', function()
    {
      $(this).find('> em').animate({ width: '91%' }, 250);
    });
});

})();
