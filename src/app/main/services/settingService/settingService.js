(function() {
  'use strict';
  angular.
  module('settingService', [
    'angular-meteor'
  ]).
  service('SettingService', function($q) {
    'ngInject';
    var serviceObject = {
      settingsId: settingsId,
      addFormsFolder: addFormsFolder,
      removeFormsFolder: removeFormsFolder,
    }
    var defer = $q.defer();
    function settingsId() {
      var cursor = Settings.find();
      var settings =  [];
      settings = cursor.fetch();
      return settings[0]._id ;
    }

    function addFormsFolder(folder) {
      var sId = settingsId();
      if(!sId){
        defer.reject("Service Id not found");
      }
      Settings.update({
        _id: sId
      }, {
       $push:{'forms.folders':folder}
      }, function(err, result) {
        if(err){
          defer.reject(err);
        }
        else{
          defer.resolve(result);
        }
      });
      return defer.promise;
    }

    function removeFormsFolder(folder) {
      var sId = settingsId();
      if(!sId){
        defer.reject("Service Id not found");
      }
      Settings.update({
        _id: sId
      }, {
       $push:{'forms.folders':folder}
      }, function(err, result) {
        if(err){
          defer.reject(err);
        }
        else{
          defer.resolve(result);
        }
      });
      return defer.promise;
    }
    return serviceObject;
  })


})();
