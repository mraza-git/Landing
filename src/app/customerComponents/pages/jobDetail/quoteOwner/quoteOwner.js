(function ()
{
    'use strict';


    var main = 'quote'; // Change this with containing folder name
    var type = 'Owner';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);
      ///////////Data///////////
      console.log('aya')
      self.subscribe('userById',function(){
        return [
          [self.getReactively('ownerId')]
        ]
      });

      self.helpers({
        user:function(){
          console.log(self.getReactively('ownerId'));
          return Meteor.users.findOne({
            _id: self.getReactively('ownerId')
          });
        }
      });


      ///////////Methods Declarations///////////



      ///////////Method Definitions///////////

    }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/jobDetail/' + name + '/' + name + '.html';
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
      ownerId:'<',      
    }
  });  
})();
