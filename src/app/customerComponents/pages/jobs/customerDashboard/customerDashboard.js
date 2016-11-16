(function () {
  'use strict';


  var main = 'customer'; // Change this with containing folder name
  var type = 'Dashboard';

  function ControllerFunction($scope, $reactive, $stateParams, $interval) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);

    ///////// Variables /////////////
    self.periodOptions = [
      {id:1,name:"This week", value:"TW"},
      {id:2,name:"This month", value:"TM"},
      {id:3,name:"This year", value:"TY"},
      {id:4,name:"All Time", value:"AT"}
    ];
    self.period = {id:1,name:"This week", value:"TW"};


    ///////////Data///////////
    self.subscribe('customerLeads', function () {
      return [
        [Meteor.userId()] || []
      ];
    });


    self.helpers({
      quotesCount: function () {
        return Counts.get('quotesCount');
      },
      assignedCount: function () {
        return Counts.get('assignedCount');
      },
      jobsCount: function () {
        return Counts.get('jobsCount');
      },
      user: function () {
        return Meteor.users.findOne({
          _id: self.getReactively('quote.owner')
        });
      }
    });



    ///////////Methods Declarations///////////

    // Widget 6
    // self.widget6 = {
    //   title: self.dashboardData.widget6.title,
    //   mainChart: {
    //     config: {
    //       refreshDataOnly: true,
    //       deepWatchData: true
    //     },
    //     options: {
    //       chart: {
    //         type: 'pieChart',
    //         color: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#e11e63'],
    //         height: 400,
    //         margin: {
    //           top: 0,
    //           right: 0,
    //           bottom: 0,
    //           left: 0
    //         },
    //         donut: true,
    //         clipEdge: true,
    //         cornerRadius: 0,
    //         labelType: 'percent',
    //         padAngle: 0.02,
    //         x: function (d) {
    //           return d.label;
    //         },
    //         y: function (d) {
    //           return d.value;
    //         },
    //         tooltip: {
    //           gravity: 's',
    //           classes: 'gravity-s'
    //         }
    //       }
    //     },
    //     data: []
    //   },
    //   footerLeft: self.dashboardData.widget6.footerLeft,
    //   footerRight: self.dashboardData.widget6.footerRight,
    //   ranges: self.dashboardData.widget6.ranges,
    //   currentRange: '',
    //   changeRange: function (range) {
    //     self.widget6.currentRange = range;

    //     /**
    //      * Update main chart data by iterating through the
    //      * chart dataset and separately adding every single
    //      * dataset by hand.
    //      *
    //      * You MUST NOT swap the entire data object by doing
    //      * something similar to this:
    //      * self.widget.mainChart.data = chartData
    //      *
    //      * It would be easier but it won't work with the
    //      * live updating / animated charts due to how d3
    //      * works.
    //      *
    //      * If you don't need animated / live updating charts,
    //      * you can simplify these greatly.
    //      */
    //     angular.forEach(self.dashboardData.widget6.mainChart, function (data, index) {
    //       self.widget6.mainChart.data[index] = {
    //         label: data.label,
    //         value: data.values[range]
    //       };
    //     });
    //   },
    //   init: function () {
    //     // Run this function once to initialize widget

    //     /**
    //      * Update the range for the first time
    //      */
    //     self.widget6.changeRange('TW');
    //   }
    // };

    


    ///////////Method Definitions///////////

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/jobs/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'pagesToolbar',

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
  var template = '<' + main + (type ? '-' : '') + (type ? type.toLowerCase() : '') + '></' + main + (type ? '-' : '') + (type ? type.toLowerCase() : '') + '>';
  var state = 'jobs.dashboard';
  var stateUrl = '/' + main + '-' + type.toLowerCase();
  var views = {
    'jobview': {
      template: template
    }

  };
  /** @ngInject */
  function config($stateProvider) {
    // State
    $stateProvider
      .state(state, {
        url: stateUrl,
        views: views,
        // resolve: isClient,       

      });
  }

})();