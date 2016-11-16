(function() {
  'use strict';

  var main = 'landing'; // Change this with containing folder name
  var type = 'Toolbar'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,AuthModals,$state,$mdSidenav) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    $reactive(self).attach($scope);
    self.helpers({
      isLoggedIn: function (){
        return !!Meteor.userId();
      },
      isSupplierLoggedIn: function (){
        return Roles.userIsInRole(Meteor.userId(),'supplier','supplier-group');
      },
      isAdminLoggedIn: function (){
        return Roles.userIsInRole(Meteor.userId(),'admin','default-group');
      }
    });


    ///////////Methods Declarations///////////
    self.openLogin = openLogin;
    self.goToDashboard = goToDashboard;
    self.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;


    ///////////Method Definitions///////////
    function toggleHorizontalMobileMenu(){
      $mdSidenav('landing-sidenav').toggle();
    }
    function openLogin(event){
      AuthModals.openLoginModal(event);
    }

    function goToDashboard(){
      if(self.isSupplierLoggedIn){
        $state.go('app.proDashboard');
      }else if(self.isAdminLoggedIn){
        $state.go('app.adminDashboard');
      }
      else{
        $state.go('jobs.dashboard');
      }
    }


   
  }

  var name = main + type;
  var templateUrl = 'app/customerComponents/landing/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'AuthModals',
      
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
