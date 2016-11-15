(function () {
  'use strict';

  angular
    .module('leadSessionStorage', [])
    .service('leadSessionService', serviceName);


  function serviceName($window, $q) {
    'ngInject';
    this.set = set;
    this.get = get;
    this.clear = clear;
    ////////////////    

    function set(lead) {
      $window.sessionStorage.setItem('foc.lead', angular.toJson(lead));
    }

    function get() {
      if ($window.sessionStorage.getItem('foc.lead')) {
        return $q.when(angular.fromJson($window.sessionStorage.getItem('foc.lead')));
      } else {
        var deferred = $q.defer();
        deferred.reject('no lead data found');
        return deferred.promise;
      }

    }

    function clear() {
      $window.sessionStorage.removeItem('foc.lead');
    }
  }
})();