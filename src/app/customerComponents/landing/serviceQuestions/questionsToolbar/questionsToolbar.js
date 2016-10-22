(function() {
  'use strict';

  var main = 'questions'; // Change this with containing folder name
  var type = 'Toolbar'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,AuthModals,serviceName,$mdMedia) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    var self = this;
    $reactive(self).attach($scope);
    self.helpers({
      isLoggedIn: function (){
        return !!Meteor.userId();
      }     
    });

    $scope.$watch(function() { return $mdMedia('(min-width: 768px)'); }, function() {
      self.service = serviceName.get();      
    });
    


  ///////////Methods Declarations///////////
    self.openLogin = openLogin;


    ///////////Method Definitions///////////
    function openLogin(event){
      AuthModals.openLoginModal(event);
    }

   
  }

  var name = main + type;
  var templateUrl = 'app/customerComponents/landing/serviceQuestions/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
       'AuthModals',
      'toolbarUser',
      'ServiceNameModule',
    
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
