(function () {
  'use strict';


  var main = 'assigned'; // Change this with containing folder name
  var type = 'Jobs';

  function ControllerFunction($scope, $reactive,$state,jobService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    ///////////Data///////////
    self.subscribe('leads', function () {
      return [{
        sort: {
          updaedAt: -1,
          createdAt: -1
        }
      }, {
        owner: Meteor.userId(),
        folder: {
          $nin: ['delete', 'archieve']
        },
        status: 'closed'
      }]
    });
    self.helpers({
      projects: function () {
        return Leads.find({});
      },
      isAdminOrSupport: function(){
        return Roles.userIsInRole(Meteor.userId(),['admin','support'],'default-group');
      }
    });
    self.autorun(function(){
      if(self.getReactively('isAdminOrSupport')){
        self.subscribe('leads',function(){
          return[
             {
              sort: {
                createdAt: -1,
                updaedAt: -1,
              }
            },
            {
              status: 'closed'
            }
          ]
        });
      }
    });


    ///////////Methods Declarations///////////
    self.deleteJob = deleteJob;
    self.archieveJob = archieveJob;
    self.duplicateJob = duplicateJob;
    self.trashJob = trashJob;
    ///////////Method Definitions///////////
    function deleteJob(ev, jobId) {
      jobService.deleteJob(ev, jobId).then(function (res) {

      }, function (err) {

      });
    }

    function trashJob(ev, job) {
      jobService.trashJob(ev, job).then(function (res) {

      }, function (err) {

      });
    }

    function archieveJob(ev, jobId) {
      jobService.archieveJob(ev, jobId).then(function (res) {}, function (err) {});
    }

    function duplicateJob(ev, job) {
      ev.stopPropagation();
      jobService.duplicateJob(job).then(function (res) {
        if (res) {
          console.log(res);
          $state.go('jobs.jobdetail',{jobId:res});
        }
      }, function (err) {
        if (err) {
          console.log('error', err);
        }
      });
    }

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/jobs/' + 'activeJobs' + '/' + 'activeJobs' + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'pagesToolbar',
      'jobServiceModule',

    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: 'activeJobs',
      bindings: {
        input: '<',
        output: '&',
      }
    })
    .config(config);
  var template = '<' + main + (type ? '-' : '') + (type ? type.toLowerCase() : '') + '></' + main + (type ? '-' : '') + (type ? type.toLowerCase() : '') + '>';
  var state = 'jobs.assignedjobs';
  var stateUrl = '/' + main + '-' + type.toLowerCase();
  var views = {
    'jobview': {
      template: '<assigned-jobs layout="column" flex></assigned-jobs>'
    }

  };
  /** @ngInject */
  function config($stateProvider) {
    // State
    $stateProvider
      .state(state, {
        url: stateUrl,
        views: views,
        data: {
          displayName: 'Active Jobs'
        }
      });
  }

})();