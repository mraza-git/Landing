(function ()
{
    'use strict';

    angular
        .module('app.coming-soon', [
          'angular-meteor',
        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_coming-soon', {
            url      : '/coming-soon',
            views    : {
                'main@'                        : {
                    templateUrl : 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_coming-soon': {
                    templateUrl : 'app/focComponents/coming-soon/coming-soon.html',
                    controller : 'ComingSoonController as vm'
                }
            },
            bodyClass: 'coming-soon'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('assets/locale/coming-soon');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.coming-soon', {
            title : 'Coming Soon',
            icon  : 'icon-alarm-check',
            state : 'app.pages_coming-soon',
            weight: 2
        });
    }

})();
