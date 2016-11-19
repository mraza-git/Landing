(function () {
  'use strict';


  var main = 'customer'; // Change this with containing folder name
  var type = 'Dashboard';

  function ControllerFunction($scope, $reactive, $stateParams, $interval,$state,returnUrlService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);

    ///////// Variables /////////////
    self.periodOptions = [
      {id:1,name:"This week", value:moment(new Date()).subtract(1,'week').endOf('week').toISOString()},
      {id:2,name:"This month", value:moment(new Date()).subtract(1,'month').endOf('month').toISOString()},
      {id:3,name:"This year", value:moment(new Date()).subtract(1,'year').endOf('year').toISOString()},
      {id:4,name:"All Time", value:new Date("01/01/2016").toISOString()}
    ];
    self.period = {id:3,name:"This year", value:moment(new Date()).subtract(1,'year').endOf('year').toISOString()};


    ///////////Data///////////
    self.subscribe('customerLeads', function () {
      self.w123Loading = true;
      return [
        [Meteor.userId()] || [] , self.getReactively("period.value")
      ];
    },{
      onReady:function(){
        self.w123Loading = false;
      }
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
      },
      featuredServices: function(){
        return Services.find({
          
        });
      }
    });

    ///////////Methods Declarations///////////
    self.getWidget6Data = getWidget6Data;
    self.getSavingWidgetData = getSavingWidgetData;
    self.changeRange = changeRange;
    self.refreshW4Data = refreshW4Data;
    self.goToQuestions = goToQuestions;
    
    self.w6title = "Graph"
    //Widget 6
    self.widget6 = {
      title: self.w6title,
      mainChart: {
        config: {
          refreshDataOnly: true,
          deepWatchData: true
        },
        options: {
          chart: {
            type: 'pieChart',
            color: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#e11e63'],
            height: 400,
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            donut: true,
            clipEdge: true,
            cornerRadius: 0,
            labelType: 'percent',
            padAngle: 0.02,
            x: function (d) {
              return d.label;
            },
            y: function (d) {
              return d.value;
            },
            tooltip: {
              gravity: 's',
              classes: 'gravity-s'
            }
          }
        },
        data: []
      },
      footerLeft: {},
      footerRight: {},
      ranges: self.periodOptions,
      currentRange: '',
      changeRange: function (range) {
        self.widget6.currentRange = range;

        /**
         * Update main chart data by iterating through the
         * chart dataset and separately adding every single
         * dataset by hand.
         *
         * You MUST NOT swap the entire data object by doing
         * something similar to this:
         * self.widget.mainChart.data = chartData
         *
         * It would be easier but it won't work with the
         * live updating / animated charts due to how d3
         * works.
         *
         * If you don't need animated / live updating charts,
         * you can simplify these greatly.
         */
        self.widget6.mainChart.data =[];
        angular.forEach(self.w6Data, function (data, index) {          
          self.widget6.mainChart.data[index] = {
            label: data._id.service,
            value: data.totalSpent
          };
          self.w6footerLeft.value += data.totalInquiries;
          self.w6footerRight.value += data.totalOpenInquiries;
        });

        self.widget6.footerLeft = self.w6footerLeft;
        self.widget6.footerRight = self.w6footerRight;
      },
      init: function (date) {
        // Run this function once to initialize widget

        /**
         * Update the range for the first time
         */
        self.widget6.changeRange(date);
      }
    };




    ///////////Method Definitions///////////
    function changeRange(){      
      self.getWidget6Data(self.period.value);
      self.refreshW4Data();
    }
    function refreshW4Data(){
      self.w4Loading = true;
      self.getSavingWidgetData(self.period.value);
    }
    function goToQuestions(serviceId){
       var returnUrl = {
        stateName: $state.current.name,
        stateParams: $state.params
      };
      returnUrlService.set(returnUrl);
      $state.go('app.serviceQuestions',{serviceId:serviceId});
    }

    function getSavingWidgetData(date){      
      Meteor.call("userTotalSaving",date,function(error,result){
        if(error){
          console.log("Error",error);
        }
        self.w4Data = result[0];
        self.w4Loading = false;        
      });
    }
    function getWidget6Data(date){
      self.w6DataLoading = true;
      Meteor.call("userSpentByServices",date,function(error,result){
        if(error){
          console.log("Error",error);
        }                
        self.w6Data = result;
        self.w6footerLeft = {          
          title: "Total Inquiries",
          value: 0
        }
        self.w6footerRight = {          
          title: "Total Open Inquiries",
          value: 0
        }
        self.widget6.init(date);
        self.w6DataLoading = false;
        $scope.$apply();
      }); 
    }

    self.changeRange();

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/jobs/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'pagesToolbar',
      'nvd3',
      'activeJobs',
      'returnUrlModule',
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