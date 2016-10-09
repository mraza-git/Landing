(function ()
{
    'use strict';

    angular
        .module('app.coming-soon')
        .controller('ComingSoonController', ComingSoonController);

    /** @ngInject */
    function ComingSoonController($scope,$reactive,$mdToast)
    {
        var vm = this;
        vm.model = {};
        $reactive(vm).attach($scope);
        vm.subscribe("emaillist");

        // Data
        vm.endTime = 1476963083000;
        vm.model.email = "";

        // Methods
        vm.save=function(){

          vm.model.createAt = new Date();
          EmailList.insert(vm.model);
          $mdToast.show(
            $mdToast.simple()
            .textContent('Thanks for subscribing, we will update you through email.')
            .position('top right')
            .action('x')
            .hideDelay(3000)
          );
          vm.model = {};

        }
        //////////
    }
})();
