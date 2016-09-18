(function ()
{
    'use strict';
    var name = "landing";
    angular
        .module(name, [
          'angular-meteor',
        ])
        .component(name, {
          templateUrl: "app/main/landing/landing.html",
          controller: LandingController,
          controllerAs: name,
          bindings:{
            input: '<',
            output: '&'
          }
        })
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.landing', {
                url    : '/landing',
                views  : {
                    'main@':{
                        templateUrl: 'app/core/layouts/content-with-toolbar.html',
                        controller: "MainController as vm"
                    },
                    'toolbar@app.landing':{
                        templateUrl: 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
                        controller: "ToolbarController as vm"
                    },
                    'content@app.landing': {
                        template: '<landing></landing>',

                    }
                },

            });


        msNavigationServiceProvider.saveItem('fuse.landing', {
            title    : 'Home',
            icon     : 'icon-tile-four',
            state    : 'app.landing',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });
    }

    function LandingController($scope,$reactive)
    {
        var vm = this;

        $reactive(vm).attach($scope);
        vm.subscribe('categories');

        // Data
        vm.helpers({
         categories: function (){
           return Categories.find();
         }
       })


        // Methods

        //////////
    }
})();
