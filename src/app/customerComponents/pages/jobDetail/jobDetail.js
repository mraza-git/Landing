(function () {
  'use strict';


  var main = 'job'; // Change this with containing folder name
  var type = 'Detail';

  function ControllerFunction($scope, $reactive, $stateParams, $state, $mdDialog, $mdToast, $timeout,returnUrlService,jobService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    self.sort= {
      subscription: 1, updatedAt:-1, createdAt:-1
    };

    self.sortOptions = [
      {id:1,value:{quotedValue:1},name:'Sort by least price'},
      {id:2,value:{quotedValue:-1},name:'Sort by high price'},
      {id:3,value:{subscription: 1, updatedAt:-1, createdAt:-1},name:'default sort'},
    ];

    $reactive(self).attach($scope);
    if ($stateParams.jobId) {
      self.jobId = $stateParams.jobId;
    }
    ///////////Data///////////
    self.quotesLoading = true;
    self.subscribe('quoteByLeadId', function () {
      return [
        [self.jobId]
      ];
    },
    {
      onReady:function(){
         self.quotesLoading = false; 
      },
      onStop:function(error){
        self.quotesLoading = false;
        self.noQuotesAvailable = true;

      }
    }
    );
    self.subscribe('leadsByIds', function () {
      return [
        [self.jobId]
      ]
    });    
    self.helpers({
      quotes: function () {
        delete self.sort.$$mdSelectId;
        return Quotes.find({
          leadId: self.jobId,
        },{
          sort: self.getReactively('sort')
        }
        );
      },
      job: function () {
        var job =Leads.findOne({
          _id: self.jobId
        });        
        return job; 
      }            
    });

    ///////////Methods Declarations///////////
    self.getLocation = getLocation;       
    self.editJob = editJob; 

    ///////////Method Definitions///////////
    self.autorun(function () {
      if (self.getReactively('job')) {
        self.getLocation('gmap');
      }

    });    

    function editJob(){
      var returnUrl = {
        stateName: $state.current.name,
        stateParams: $state.params
      };
      returnUrlService.set(returnUrl);
      $state.go("app.serviceQuestions",{serviceId:self.job.serviceId,leadId:self.job._id});
    }

    

    function getLocation(qtype) {
      if (self.getReactively('job').pages) {
        angular.forEach(self.getReactively('job').pages, function (value, i) {
          angular.forEach(value.questions, function (question, j) {
            if (question.questionType === qtype) {
              self.question = question;
              self.location = question.answer;
              // $scope.$apply();                           
              return;
            }
          });
        });
      } else {
        if (self.done) {
          self.done({
            $event: {
              question: null,
              error: "no map found mentioned..."
            }
          });
        }
        return "no map found...";
      }

    }

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'pagesToolbar',
      'quoteOwner',
      'projectSummary',
      'projectMap',
      'projectGallery',
      'returnUrlModule',
      'jobServiceModule',            

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
 var template = '<'+main+ (type?'-':'')+(type?type.toLowerCase():'')+'></'+main+(type?'-':'')+(type?type.toLowerCase():'')+'>';
  var state = 'jobs.jobdetail';
  var stateUrl = '/'+main+'-'+type.toLowerCase()+'/:jobId';
  var views = {
    'jobview':{
      template:template
    }
     
  };
  /** @ngInject */
  function config($stateProvider)
  {
    // State
    $stateProvider
    .state(state, {
      url    : stateUrl,
      views  : views,
    });
  }

})();

