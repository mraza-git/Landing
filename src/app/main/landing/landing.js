
Meteor.subscribe("categories");

(function ()
{
    'use strict';
    var name = "landing";
    angular
        .module(name, [
          'angular-meteor',
          'ngLoad',
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
        .config(config)
        .directive("focscroll", function () {
            return function(scope, element, attrs) {
                angular.element(document.getElementById('content')).bind("scroll", function() {
                     if (this.scrollTop >= 100) {
                         scope.position100 = true;
                     }

                     if(this.scrollTop>= 400){
                       scope.position400 = true;
                     }

                    if(this.scrollTop>= 1700){
                      scope.position1700 = true;
                    }
                    else {

                     }
                    //  console.log(scope.showPartners);
                    // console.log(this.scrollTop);
                    scope.$apply();
                });
            };
        });

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
        vm.servicesReady = false;
        vm.subscribe("services",null,{
          onReady: function (){
            vm.servicesReady = true;
          }
        });

        // Data
        vm.helpers({
         categories: function (){
           return Categories.find();
         },
         services: function(){
           return Services.find();
         }
       })

       vm.counter = [];
       // Methods

       vm.showImage = function(index,length){
         vm.counter++;
         if(vm.counter>=length){
           checkBrowser();
           vm.imageShow = true;
         }
       }

        var checkBrowser = function(){
          if ( ! Modernizr.objectfit ) {
            console.log("Old Browser")
            $('.post__image-container').each(function () {
              var $container = $(this),
              imgUrl = $container.find('img').prop('src');
              if (imgUrl) {
                $container
                .css('backgroundImage', 'url(' + imgUrl + ')')
                .addClass('compat-object-fit');

              }
            });
          }
          else {
              console.log("New Browser")
          }
        }
        //////////
    }

})();
