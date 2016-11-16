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
      'landingFooter',
      'imageUpload',
      'landingNavbar',
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
      return function (scope, element, attrs) {
        angular.element(document.getElementById('content')).bind("scroll", function () {

          var elemContent = document.getElementById('content');
          var elemHowItWorks = document.getElementById('work');
          var elemVideo = document.getElementById('video');
          var elemCategories = document.getElementById('categories');
          var elemPartner = document.getElementById('partner');

          var elemPartnerTopRect = elemPartner.getBoundingClientRect().top - elemContent.offsetHeight / 1.2;
          var elemVideoTopRect = elemVideo.getBoundingClientRect().top - elemContent.offsetHeight / 1.2;
          var elemCategoriesTopRect = elemCategories.getBoundingClientRect().top - elemContent.offsetHeight / 1.2;
          var elemHowItWorksTopRect = elemHowItWorks.getBoundingClientRect().top - elemContent.offsetHeight / 1.2;


          if (elemPartnerTopRect <= 0) {
            scope.partnerReached = true;
          } else {
            scope.partnerReached = false;
          }

          if (elemVideoTopRect <= 0) {
            scope.videoReached = true;
          } else {
            scope.videoReached = false;
          }

          if (elemCategoriesTopRect <= 0) {
            scope.categoriesReached = true;
          } else {
            scope.categoriesReached = false;
          }

          if (elemHowItWorksTopRect <= 0) {
            scope.howItWorksReached = true;
          } else {
            scope.howItWorksReached = false;
          }
          scope.$apply();
        });
      };
    });

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.landing', {
        url: '/',
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

  function LandingController($scope, $reactive, $mdMedia, $mdDialog, $state) {


    ////////////////Data///////////////////
    var self = this;
    $scope.$mdMedia = $mdMedia;

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
        return Services.find({

        });
      },
      servicesNames: function () {
        var strings = [];
        angular.forEach(self.getReactively('services'), function (value, index) {
          strings.push(value.name);
        });
        return strings;
      }

    });
    self.counter = [];

    ////////////////Method Declarations///////////////////    
    self.showImage = showImage;
    self.openServiceListDialog = openServiceListDialog;
    self.typedFunction = typedFunction;
    self.goToService = goToService;



    ////////////////Method Definitions///////////////////

    self.autorun(function () {
      if (self.getReactively('servicesNames'))
        self.typedFunction();
    });
    // Methods

    function goToService(event) {
      $state.go('app.serviceQuestions', {
        serviceId: event.serviceId
      });
    }

    function showImage(index, length) {
      self.counter++;
      if (self.counter >= length) {
        checkBrowser();
        self.imageShow = true;
      }
    }



    function typedFunction() {
      $(".typed-heading").typed({
        strings: ["Fix certified service professionals in just a click", "Service needs, made easy.", "Problem?... no problem!", "Mushkil?... mafi muskila"],
        // ["Service needs, made easy.", "Problem?... no problem!", "Mushkil?... mafi muskila"],
        // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
        stringsElement: null,
        // typing speed
        typeSpeed: 30,
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

    function openServiceListDialog(category, ev) {
      if (category) {
        if (!category.publish) {
          return;
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

var checkBrowser = function () {
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
};