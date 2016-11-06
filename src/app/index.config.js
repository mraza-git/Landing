(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config($mdDateLocaleProvider)    
    {
    //     $mdDateLocaleProvider.formatDate = function(date) {
    //    return moment(date).format('DD-MM-YYYY');
    // };
    }

})();