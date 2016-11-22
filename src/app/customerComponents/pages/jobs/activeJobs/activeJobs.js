(function () {
  'use strict';


  var main = 'active'; // Change this with containing folder name
  var type = 'Jobs';

  function ControllerFunction($scope,$state, $reactive, jobService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    self.sort = {id:1,value:{createdAt:-1},name:'latest on top'};
     self.sortOptions = [
     {id:1,value:{createdAt:-1},name:'latest on top'},
     {id:2,value:{createdAt:1},name:'oldest on top'},
     {id:3,value:{updatedAt:-1},name:'sort by last updated'},          
    ];
    ///////////Data///////////
    self.subscribe('leads',function(){
      self.loading = true;
      delete self.sort.$$mdSelectId;      
      return[
        {
          sort: self.getReactively('sort.value')
        },
        {
          owner: self.getReactively('userId'),
          folder: {$nin:['delete','archieve']},
          $or: 
          [
            {
              status: 'open'
            }, 
            {
              status: 
              {
                $exists: false
              }
            } 
          ]
        } 
      ]
    },
    {
      onReady: function(){
        self.loading = false;
      },
      onStop: function(){
        self.loading = false;
      }
    }
    );
    
    self.helpers({
      projects: function () {
        delete self.sort.$$mdSelectId;
        var leads =Leads.find({          
          owner: self.getReactively('userId'),
          folder: {$nin:['delete','archieve']},
          $or: 
          [
            {
              status: 'open'
            }, 
            {
              status: 
              {
                $exists: false
              }
            } 
          ]        
        });

        // if(leads.fetch().length>0){
        //   self.loading = false;
        // }
        return leads;
      },
      userId:function(){
        return Meteor.userId();
      },
      isAdminOrSupport: function(){
        return Roles.userIsInRole(self.getReactively('userId'),['admin','support'],'default-group');
      }
    });

    self.autorun(function(){
      if(self.getReactively('isAdminOrSupport')){        
        self.subscribe('leads',function(){
          self.loading = true;
          delete self.sort.$$mdSelectId;
          return[
             {
              sort: self.getReactively('sort.value')
            },
            {
              
                $or: 
                [
                  {
                    status: 'open'
                  }, 
                  {
                    status: 
                    {
                      $exists: false
                    }
                  } 
                ]
              
            }
          ]
        },
        {
          onReady: function(){
            self.loading = false;
            $scope.$apply();
          },
          onStop: function(err){
            console.log(err);
            self.loading = false;
            $scope.$apply();
          }
        });
      }
    });


    ///////////Methods Declarations///////////
    self.recover = recover;
    self.moveTo = moveTo;
    self.duplicateJob = duplicateJob;
    self.trashJob = trashJob;
    self.viewOriginal = viewOriginal;

    ///////////Method Definitions///////////

    function recover(ev,jobId){
      ev.stopPropagation();
      jobService.recover(ev,jobId).then(function(res){},function(err){});
    }

    function moveTo(ev,jobId,folder){
      ev.stopPropagation();
      jobService.moveTo(ev,jobId,folder).then(function(res){},function(err){});
    }

    function trashJob(ev,job){
      ev.stopPropagation();
      jobService.trashJob(ev,job).then(function(res){},function(err){});
    }

    function viewOriginal(ev,jobId){
      ev.stopPropagation();
      $state.go("jobs.jobdetail",{jobId:jobId});
    }

    function duplicateJob(ev,job){
      ev.stopPropagation();
      jobService.duplicateJob(job).then(function(res){
        if(res){
          console.log(res);
          $state.go('jobs.jobdetail',{jobId:res});
        }
      },function(err){
        if(err){
          console.log('error',err);
        }
      });
    }


  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/jobs/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'pagesToolbar',
      'formServices',
      'thumbImage',
      'jobServiceModule',
      'leadOwner'

    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        inline: '<',        
      }
    })
    .config(config);
  var template = '<' + main + (type ? '-' : '') + (type ? type.toLowerCase() : '') + '></' + main + (type ? '-' : '') + (type ? type.toLowerCase() : '') + '>';
  var state = 'jobs.activejobs';
  var stateUrl = '/' + main + '-' + type.toLowerCase();
  var views = {
    'jobview': {
      template: '<active-jobs layout="column" flex></active-jobs>'
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