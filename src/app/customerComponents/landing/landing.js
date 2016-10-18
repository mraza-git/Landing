Meteor.subscribe("categories");

(function () {
    'use strict';
    var name = "landing";
    angular
        .module(name, [
            'angular-meteor',
            'ngLoad',
            'toolbarUser',
            'landingToolbar',
            'serviceQuestions',
            'serviceAutocomplete',
        ])
        .component(name, {
            templateUrl: "app/customerComponents/landing/landing.html",
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

                     if(this.scrollTop>= 500){
                       scope.position500 = true;
                     }

                     if(this.scrollTop>= 600){
                       scope.position600 = true;
                     }
                                         
 
                     if(this.scrollTop>= 700){
                       scope.position700 = true;
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
                url: '/home',
                views: {
                    'main@': {
                        templateUrl: 'app/core/layouts/content-with-toolbar.html',
                        controller: "MainController as self"
                    },
                    'toolbar@app.landing': {
                        template: '<landing-toolbar></landing-toolbar>',                        
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

    function LandingController($scope, $reactive, $mdMedia, $mdDialog,$state) {


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
        self.goToService = goToService;



        ////////////////Method Definitions///////////////////


        self.typedFunction();
        // Methods

        function goToService(event){
            $state.go('app.serviceQuestions',{serviceId:event.serviceId});            
        }

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
            strings: ["Service needs, made easy.", ".احتياجات الخدمة، جعلت من السهل", "besoins de service, en toute simplicité."],
            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            // typing speed
            typeSpeed: 10,
            // time before typing starts
            startDelay: 1000,
            // backspacing speed
            backSpeed: 0,
            // shuffle the strings
            shuffle: false,
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
            if(category){
                if(!category.publish){
                    return ;
                }
            }
            $mdDialog.show({
                controller: serviceSelectorModelController,
                controllerAs: 'serviceList',
                locals: {
                    category: category,
                },
                templateUrl: 'app/customerComponents/landing/modelboxes/serviceSelector.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (res) {
                
            });
        }
    }

})();