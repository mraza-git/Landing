(function () {
  'use strict';

  angular
    .module('ServiceNameModule', [])
    .service('serviceName', serviceName);

  serviceName.$inject = [];

  function serviceName() {
    this.set = set;
    this.get = get;
    this.service = {};

    ////////////////

    function set(service) {
      if (service) {
        this.service.name = service.name;
        this.service.description = service.description;
      }
    }

    function get() {
      return this.service;
    }
  }
})();