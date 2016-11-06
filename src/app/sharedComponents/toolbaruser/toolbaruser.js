// import angular from 'angular';
// import angularMeteor from 'angular-meteor';
// import uiRouter from 'angular-ui-router';
// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
// import {name as AuthModals} from '../../../../client/components/authmodals/authModals';
// import {Thumbs40,Images} from '../../../api/images';
// import {name as FileUpload} from '../fileUpload/fileUpload';

// import template from './toolbaruser.web.html';
// import pictureModalTemplate from '../modalTemplates/setPictureModal.html';




function ToolbarUser($scope, $reactive, $state, AuthModals, $mdDialog, $mdMedia) {
  'ngInject';
  $reactive(this).attach($scope);
  this.state = $state;
  this.userStatus = [{}];
  this.authModals = AuthModals;
  this.$mdDialog = $mdDialog;
  this.$mdMedia = $mdMedia;

  this.subscribe('user');
  this.subscribe('thumbs40', function () {
    return [
      [this.getReactively('user.profile.dpImageId', true)] || []
    ];
  });
  //this.subscribe('userStatus', Meteor.userId());

  this.helpers({
    user: function () {
      return Meteor.users.findOne({
        _id: Meteor.userId()
      });
    },
    isLoggedIn: function () {
      return !!Meteor.userId();
    },
    currentUserId: function () {
      return Meteor.userId();
    },
    thumbs: function () {
      return Thumbs40.find({
        originalId: {
          $in: [this.getReactively('user.profile.dpImageId', true)] || []
        }
      });
    },
    isSupplierLoggedIn: function(){
      return Roles.userIsInRole(Meteor.userId(),'supplier','supplier-group');
    }
  });
  // Setup status options, later put them in db.
  this.userStatusOptions = [{
    'title': 'Online',
    'icon': 'icon-checkbox-marked-circle',
    'color': '#4CAF50'
  }, {
    'title': 'Away',
    'icon': 'icon-clock',
    'color': '#FFC107'
  }, {
    'title': 'Do not Disturb',
    'icon': 'icon-minus-circle',
    'color': '#F44336'
  }, {
    'title': 'Invisible',
    'icon': 'icon-checkbox-blank-circle-outline',
    'color': '#BDBDBD'
  }, {
    'title': 'Offline',
    'icon': 'icon-checkbox-blank-circle-outline',
    'color': '#616161'
  }];

  this.userStatus = this.userStatusOptions[1];


  ////////////// Method Declaration //////////////////
  this.setUserStatus = setUserStatus;
  this.logout = logout;
  this.openChangePassword = openChangePassword;  
  this.pictureUploaded = pictureUploaded;
  this.goToProfile = goToProfile;




  ////////////// Method Definition ////////////////////
  function goToProfile(){    
     if(this.isSupplierLoggedIn){
        $state.go('app.p',{username:""});
      }
      else{
        $state.go('app.profile',{userId: Meteor.userId()});
      }
  }

  function setUserStatus(status) {
    this.userStatus = status;
    Meteor.users.update({
      _id: this.user._id
    }, {
      $set: {
        "profile.userStatus": angular.copy(status)
      }
    }, function (error) {
      if (error) {
        console.log('Unable to update', error);
      } else {
        console.log('User Updated!');
      }
    });

  }

  function logout(event) {
    Accounts.logout(function () {
      $state.go("app.landing");
    }, function (err) {
      console.log(err);
      return;
    });
  }

  function openChangePassword(event) {
    this.authModals.openChangeModal(event);
  }

  function pictureUploaded(event) {      
    if (event) {      
      var oldPicId = Meteor.user().profile.dpImageId;
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          "profile.dpThumbUrl": event.file.url,
          "profile.dpImageId": event.file.id,
        }
      }, function (error) {
        if (error) {
          console.log('Unable to update', error);
          Images.remove({
            _id: event.file.id
          }); // Remove new image if user update failed.
        } else {
          //New Picture Updated
          Images.remove({
            _id: oldPicId
          }); // Remove old image once new is updated.
        }
      });
    } else {
      // User Closed without uploading the picture.
      console("No file uploaded");

    }

  }

}


var name = 'toolbarUser';
// var ToolbarUser = ToolbarUser;

// create a module
angular.module(name, [
  'angular-meteor',
  'fileUpload',
  'imageUpload',
  'assignedJobs',
  'activeJobs',
  'projects'
]).component(name, {
  templateUrl: "app/sharedComponents/toolbaruser/toolbaruser.web.html",
  controller: ToolbarUser,
  controllerAs: name
});