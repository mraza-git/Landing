(function () {
  'use strict';

  angular
    .module('returnUrlModule', [])
    .service('returnUrlService', serviceName);


  function serviceName($window, $q) {
    'ngInject';
    this.set = set;
    this.get = get;
    this.clear = clear;
    ////////////////    

    function set(returnUrl) {
      $window.sessionStorage.setItem('foc.returnUrl', angular.toJson({stateName:returnUrl.stateName,stateParams:returnUrl.stateParams}));
    }

    function get() {
      if ($window.sessionStorage.getItem('foc.returnUrl')) {
        return $q.when(angular.fromJson($window.sessionStorage.getItem('foc.returnUrl')));
      } else {
        var deferred = $q.defer();
        deferred.reject('no returnUrl data found');
        return deferred.promise;
      }

    }

    function clear() {
      $window.sessionStorage.removeItem('foc.returnUrl');
    }
  }
})();