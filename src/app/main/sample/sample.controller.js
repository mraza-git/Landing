(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(SampleData)
    {
        var vm = this;

        // Data
        vm.helloText = SampleData.data.helloText;

        // Methods
        vm.onUpdate = function(event){
          console.log("message:",event);
          vm.helloText = "This is updated: "+ event.newmessage;
        }
        //////////
    }
})();
