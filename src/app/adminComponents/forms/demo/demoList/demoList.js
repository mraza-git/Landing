(function ()
{
    'use strict';


    var main = 'demo'; // Change this with containing folder name
    var type = 'List';
    function ControllerFunction($scope,$reactive){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      $reactive(self).attach($scope);

      ///////////Data///////////
      self.subscribe('images');
      self.subscribe('userById',function(){
        return [
          self.getReactively('userIds')
        ]
      });

      self.helpers({
        images: function(){
          return Images.find({},{
            sort:{userId:1}
          });
        },
        services: function (){
          return Services.find();
        },
        userIds: function(){
          var images = self.getReactively('images');
          var ids = [];
          if(images){
            ids = images.map(function (obj){
              return obj.userId;
            });
          }
          return ids;
        }
      });


      ///////////Methods Declarations///////////
      self.remove = remove;
      self.getUserName = getUserName



      ///////////Method Definitions///////////
      function remove(image){
        Images.remove(image._id);
      }
      function getUserName(id){
        var user = Meteor.users.findOne({_id:id});
        if(user){
          return user.profile.name;
        } 
        else return "";
      }

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
