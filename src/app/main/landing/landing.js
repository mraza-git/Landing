Meteor.subscribe("categories");

(function () {
    'use strict';
    var name = "landing";
    angular
        .module(name, [
            'angular-meteor',
            'ngLoad',
            'serviceQuestions',
        ])
        .component(name, {
            templateUrl: "app/main/landing/landing.html",
            controller: LandingController,
            controllerAs: name,
            bindings: {
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

                    if(this.scrollTop>= 1000){
                      scope.position1000 = true;
                    }

                    if (this.scrollTop >= 1700) {
                        scope.position1700 = true;
                    } else {

                    }
                    //  console.log(scope.showPartners);
                    // console.log(this.scrollTop);
                    scope.$apply();
                });
            };
        });

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.landing', {
                url: '/landing',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/content-with-toolbar.html',
                        controller: "MainController as self"
                    },
                    'toolbar@app.landing': {
                        templateUrl: 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
                        controller: "ToolbarController as self"
                    },
                    'content@app.landing': {
                        template: '<landing></landing>',

                    }
                },

            });


        msNavigationServiceProvider.saveItem('fuse.landing', {
            title: 'Home',
            icon: 'icon-tile-four',
            state: 'app.landing',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'SAMPLE.SAMPLE_NAV',
            weight: 1
        });
    }

    function LandingController($scope, $reactive, $mdMedia, $mdDialog) {


        ////////////////Data///////////////////
        var self = this;

        $reactive(self).attach($scope);
        self.servicesReady = false;
        self.subscribe("services", null, {
            onReady: function () {
                self.servicesReady = true;
            }
        });

        // Data
        self.helpers({
            categories: function () {
                return Categories.find();
            },
            services: function () {
                return Services.find();
            }
        });
        self.counter = [];

        ////////////////Method Declarations///////////////////
        self.checkBrowser = checkBrowser;
        self.showImage = showImage;
        self.openServiceListDialog = openServiceListDialog;
        self.typedFunction = typedFunction;



        ////////////////Method Definitions///////////////////

        self.typedFunction();
        // Methods

        function showImage(index, length) {
            self.counter++;
            if (self.counter >= length) {
                self.checkBrowser();
                self.imageShow = true;
            }
        }

        function checkBrowser() {
            if (!Modernizr.objectfit) {
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
            } else {
                console.log("New Browser")
            }
        }
        function typedFunction(){
            $(".typed-heading").typed({
            strings: ["Problem no problem...", "Another description....",'Service needs, made easy.'],
            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            // typing speed
            typeSpeed: 10,
            // time before typing starts
            startDelay: 1000,
            // backspacing speed
            backSpeed: 0,
            // shuffle the strings
            shuffle: true,
            // time before backspacing
            backDelay: 1000,
            // loop
            loop: true,
            // false = infinite
            loopCount: 10,
            // show cursor
            showCursor: true,
            // character for cursor
            cursorChar: "|",
            
        });
        }
        //////////

        function openServiceListDialog(category,ev) {
            $mdDialog.show({
                controller: serviceSelectorModelController,
                controllerAs: 'serviceList',
                locals: {
                    category: category,
                },
                templateUrl: 'app/main/landing/modelboxes/serviceSelector.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (res) {
                
            });
        }
    }

})();