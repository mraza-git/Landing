(function () {
  'use strict';


  var main = 'jobs'; // Change this with containing folder name

  function ControllerFunction($reactive, $scope,$interval) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);

    ///////////Methods Declarations///////////
    self.helpers({
      user: function () {
        return Meteor.user();
      }
    })


    ///////////Method Definitions///////////

    // Now widget
    self.nowWidget = {
      now: {
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        year: ''
      },
      ticker: function () {
        var now = moment();
        self.nowWidget.now = {
          second: now.format('ss'),
          minute: now.format('mm'),
          hour: now.format('HH'),
          day: now.format('D'),
          weekDay: now.format('dddd'),
          month: now.format('MMMM'),
          year: now.format('YYYY')
        };
      }
    };

    // Now widget ticker
    self.nowWidget.ticker();

    var nowWidgetTicker = $interval(self.nowWidget.ticker, 1000);

    $scope.$on('$destroy', function () {
      $interval.cancel(nowWidgetTicker);
    });


  }

  var name = main; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'customerDashboard'
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        input: '<',
        output: '&',
      }
    })
    .config(config);
  var template = '<jobs><jobs/>';
  var state = 'jobs';
  var stateUrl = '/' + main;
  var views = {
    'main@': {
      templateUrl: 'app/core/layouts/content-with-toolbar.html',
      controller: "MainController as self"
    },
    'content@jobs': {
      template: template,
    },
    'toolbar@jobs': {
      template: '<pages-toolbar></pages-toolbar>',
    },

  };
  /** @ngInject */
  function config($stateProvider) {
    // State
    $stateProvider
      .state(state, {
        url: stateUrl,
        parent: 'app',
        views: views,
        abstract: true,


      });
  }

})();