(function ()
{
    'use strict';


    var main = 'assigned'; // Change this with containing folder name
    var type = 'Jobs';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      ///////////Data///////////
      self.subscribe('leadsByOwnerId');
      self.helpers({
        projects:function(){          
          return Leads.find({
            owner: Meteor.userId(),
            status:'closed'
          });
        }
      });


      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + type; // Change This with Component Name
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
  var state = 'jobs.assignedjobs';
  var stateUrl = '/'+main+'-'+type.toLowerCase();
  var views = {
    'jobview':{
      template:template
    }
     
  };
  /** @ngInject */
  function config($stateProvider)
  {
    // State
    $stateProvider
    .state(state, {
      url    : stateUrl,
      views  : views,
      data:{
        displayName:'Active Jobs'
      }
    });
  }

})();
