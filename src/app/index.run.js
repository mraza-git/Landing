(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state)
    {
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Show error on state change errors Need to implement in detail by Arslan.
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
            console.log(event);
            // console.log(toState);
            // console.log(toParams);
            // console.log(fromState);
            // console.log(fromParams);
            console.error(error);

            if (error === 'AUTH_REQUIRED') {
                $state.go('401');
            } else if (error === 'AUTH_FORBIDDEN') {
                $state.go('dashboard');
            } else {
                $state.go('404');
            }
        });

        

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();