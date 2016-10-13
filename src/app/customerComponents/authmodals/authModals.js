// import angular from 'angular';
// import angularMeteor from 'angular-meteor';
// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
//
//
// import {name as focNavMenuService} from '../../../imports/services/navmenuService';
// import loginWebTemplate from './login.web.html';
// import loginMobileTemplate from './login.mobile.html';
// import registerWebTemplate from './register.web.html';
// import registerMobileTemplate from './register.mobile.html';
// import forgotWebTemplate from './forgot.web.html';
// import forgotMobileTemplate from './forgot.mobile.html';
// import changeWebTemplate from './change.web.html';
// import changeMobileTemplate from './change.mobile.html';
//
//
// class AuthModals {
(function(){

  function AuthModals($mdDialog, $mdMedia) {
    var vm = this;

    vm.credentials = {};
    'ngInject';

    vm.$mdDialog = $mdDialog;
    vm.$mdMedia = $mdMedia;
    vm.credentials.email = "";
    vm.credentials.password ="";
    vm.credentials.profile = {name :""};


  vm.openLoginModal = function (event) {
    // const modalTemplate = Meteor.isCordova ? loginMobileTemplate: loginWebTemplate;
    vm.$mdDialog.show({
      controller: function ($mdDialog,AuthModals) {
        'ngInject';
        var mbvm =this;
        mbvm.close = function () {
          $mdDialog.hide();
        }
        mbvm.login =function(){
          mbvm.loading = true;
          Meteor.loginWithPassword(mbvm.credentials.email, mbvm.credentials.password,
            function (err) {
              if (err) {
                mbvm.error = err.reason;
                mbvm.loading = false;
              } else {
                console.log("Logged In");
                mbvm.loading = false;
                mbvm.close();
              }
            }
          );
        }
        mbvm.register= function (event){
          AuthModals.openRegisterModal(event);
          mbvm.close();
        }
        mbvm.forgot= function (event){
          AuthModals.openForgotModal(event);
          mbvm.close();
        }
      },
      controllerAs: 'modalLogin',
      templateUrl: 'app/customerComponents/authmodals/login.web.html',
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: vm.$mdMedia('sm') || vm.$mdMedia('xs')
    });
  }
  vm.openRegisterModal = function (event) {
    vm.$mdDialog.show({
      controller: function ($mdDialog,AuthModals) {
        'ngInject';
        var mbvm = this;
        mbvm.close = function () {
          $mdDialog.hide();
        }
        mbvm.register = function (){
          mbvm.loading = true;
          Accounts.createUser(mbvm.credentials,
            function (err)  {
              if (err) {
                mbvm.error = err.reason;
                  mbvm.loading = true;
              } else {
                // Toast here
                mbvm.close();
                mbvm.loading = false;
              }
            }
          );
        }
        mbvm.login = function (event){
          AuthModals.openLoginModal(event);
          mbvm.close();
        }
      },
      controllerAs: 'modalRegister',
      templateUrl: "app/customerComponents/authmodals/register.web.html",
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: vm.$mdMedia('sm') || vm.$mdMedia('xs')
    });
  }
  vm.openForgotModal = function (event) {

    vm.$mdDialog.show({
      controller: function ($mdDialog,AuthModals) {
        'ngInject';
        var mbvm = this;
        mbvm.close = function () {
          $mdDialog.hide();
        }
        mbvm.forgot= function (){
          mbvm.loading = true;
          Accounts.forgotPassword(this.credentials, function (err) {
            if (err) {
              console.log(err);
              mbvm.loading = false;
              mbvm.error = err.reason;
            } else {
              // toast here
              mbvm.close();
              mbvm.loading = false;
            }
          });
        }
        mbvm.login=function (event){
          AuthModals.openLoginModal(event);
          mbvm.close();
        }
      },
      controllerAs: 'modalForgot',
      templateUrl: "app/customerComponents/authmodals/forgot.web.html",
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: vm.$mdMedia('sm') || vm.$mdMedia('xs')
    });
  }
  vm.openChangeModal = function (event) {
    vm.$mdDialog.show({
      controller: function ($mdDialog,AuthModals) {
        'ngInject';
        var mbvm = this;
        if(!Meteor.userId()) {
          // Toast Login to change password.
          mbvm.error = "Login to change password";

        }
        mbvm.close = function () {
          $mdDialog.hide();
        }
        mbvm.change= function (){
          mbvm.loading = true;
          if(!Meteor.userId())
            return;
            mbvm.options = {
              logout:false
            }
          Meteor.call('setPassword',Meteor.userId(),mbvm.credentials.password,mbvm.options,function(err,res){
              if(err){
                console.log("Error Updating Password",err);
                mbvm.loading = false;
                mbvm.error = err.reason;
              }
              else{
                console.log("Password updated.");
                mbvm.close();
                mbvm.loading = false;
              }
          });
        }
        mbvm.login=function (event){
          AuthModals.openLoginModal(event);
          mbvm.close();
        }
      },
      controllerAs: 'modalChange',
      templateUrl: "app/customerComponents/authmodals/change.web.html",
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: vm.$mdMedia('sm') || vm.$mdMedia('xs')
    });
  }
  // vm.checkRole = function (){
  //   if(Roles.userIsInRole(Meteor.userId(),['admin','manage-users'],"default-group")) {
  //     return 'admin';
  //   }
  //   else
  //   return 'customer';
  // }



}

const name = 'AuthModals';

// create a module
// export default
angular.module(name, [
  'angular-meteor',
  // focNavMenuService,
]).service(name, AuthModals);
})();
