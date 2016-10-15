(function() {
  'use strict';

  var main = 'pages'; // Change this with containing folder name
  var type = 'Toolbar'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,AuthModals) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    $reactive(self).attach($scope);
    self.helpers({
      isLoggedIn: function (){
        return !!Meteor.userId();
      }
    });


    ///////////Methods Declarations///////////
    self.openLogin = openLogin;


    ///////////Method Definitions///////////
    function openLogin(event){
      AuthModals.openLoginModal(event);
    }


   
  }

  var name = main + type;
  var templateUrl = 'app/sharedComponents/toolbars/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'AuthModals',
      'toolbarUser',
      
      ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        index: '<',
        list: '=',
        done: '&',
      }
    });


})();
