(function ()
{
    'use strict';


    var main = 'quote'; // Change this with containing folder name
    var type = 'Detail';
    function ControllerFunction($scope,$reactive,$stateParams){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      if($stateParams.quoteId){
        self.quoteId = $stateParams.quoteId;
      }
      ///////////Data///////////
      self.subscribe('quotesByIds',function(){
        return [
          [self.quoteId]
        ];
      });
      self.subscribe('userById',function(){
        return [
          [self.getReactively('quote.owner')]
        ]
      });
      // self.subscribe('leadsByIds',function(){
      //   return [
      //     [self.jobId]
      //   ]
      // });
      self.helpers({
        quote:function(){
          return Quotes.findOne({
            _id: self.quoteId,
          });
        },
        user: function(){
          return Meteor.users.findOne({
            _id: self.getReactively('quote.owner')
          });
        }        
      });



      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/jobs/' + name + '/' + name + '.html';
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
  var state = 'jobs.quotedetail';
  var stateUrl = '/'+main+'-'+type.toLowerCase()+'/:quoteId';
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
      // resolve: isClient,       

    });
  }

})();



      