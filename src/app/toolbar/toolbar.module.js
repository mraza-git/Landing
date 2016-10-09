(function ()
{
    'use strict';

    angular
        .module('app.toolbar', ['app.core'])
        .config(config);

    /** @ngInject */
    function config($translatePartialLoaderProvider)
    {
        $translatePartialLoaderProvider.addPart('app/toolbar');
    }
})();
