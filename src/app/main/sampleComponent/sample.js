(function ()
{
    'use strict';

    var name = "sampleComponent";

    angular
        .module(name, ['angular-meteor',])
        .component(name,{
          templateUrl: 'app/main/sampleComponent/sample.html',
          controller: sampleController,
          controllerAs: name,
          bindings:{
            input:'<',
            output: '&',
          }
        })
        .config(config);
        function config(){

        }
        function sampleController(){

        }


})();
