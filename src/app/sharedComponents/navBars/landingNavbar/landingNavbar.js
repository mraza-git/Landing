(function() {
  'use strict';

  var main = 'landing'; // Change this with containing folder name
  var type = 'Navbar'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,AuthModals,$state) {
    'ngInject';
    ///////////Data///////////
    var self = this;
    $reactive(self).attach($scope);
    self.helpers({
      user: function(){
        return Meteor.user();
      },
      isLoggedIn: function (){
        return !!Meteor.userId();
      },
      isSupplierLoggedIn: function(){
      return Roles.userIsInRole(Meteor.userId(),'supplier','supplier-group');
      },
      isAdminLoggedIn: function (){
        return Roles.userIsInRole(Meteor.userId(),'admin','default-group');
      }
    });


    ///////////Methods Declarations///////////
    self.openLogin = openLogin;
    self.logout = logout;
    self.goToProfile = goToProfile;
    self.goToDashboard = goToDashboard;



    ///////////Method Definitions///////////
    function openLogin(event){
      AuthModals.openLoginModal(event);
    }
    function logout(event) {
      Accounts.logout(function () {
        $state.go("app.landing");
      }, function (err) {
        console.log(err);
        return;
      });
    }

    function goToProfile(){    
     if(self.isSupplierLoggedIn){
        $state.go('app.p',{username:""});
      }
      else{
        $state.go('app.profile',{userId: Meteor.userId()});
      }
  }

  function goToDashboard(){
      if(self.isSupplierLoggedIn){
        $state.go('app.proDashboard');
      }else if(self.isAdminLoggedIn){
        $state.go('app.adminDashboard');
      }
      else{
        $state.go('app.dashboard');
      }
    }


   
  }

  var name = main + type;
  var templateUrl = 'app/sharedComponents/navBars/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'AuthModals',
      'toolbarUser',     
      'thumbImage', 
      
      ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {      
      }
    });


})();
