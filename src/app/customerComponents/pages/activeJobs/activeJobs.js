(function () {
  'use strict';


  var main = 'active'; // Change this with containing folder name
  var type = 'Jobs';

  function ControllerFunction($scope,$state, $reactive, jobService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    self.sort = {updatedAt:-1},
     self.sortOptions = [
     {id:1,value:{createdAt:-1},name:'latest on top'},
     {id:2,value:{createdAt:1},name:'oldes on top'},
     {id:3,value:{updatedAt:-1},name:'sort by last updated'},          
    ];
    ///////////Data///////////
    self.subscribe('leads',function(){
      self.loading = true;
      delete self.sort.$$mdSelectId;
      console.log(self.sort);
      return[
        {
          sort: self.getReactively('sort')
        },
        {
          owner: Meteor.userId(),
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
    },function(){
        self.loading = false;
    });
    
    self.helpers({
      projects: function () {
        delete self.sort.$$mdSelectId;
        var leads =Leads.find({},
        {
          sort: self.getReactively('sort')          
        }
        );        
        if(leads.fetch().length>0){
          self.loading = false;
        }
        return leads;
      },
      isAdminOrSupport: function(){
        return Roles.userIsInRole(Meteor.userId(),['admin','support'],'default-group');
      }
    });

    self.autorun(function(){
      if(self.getReactively('isAdminOrSupport')){
        self.subscribe('leads',function(){
          self.loading = true;
          delete self.sort.$$mdSelectId;
          return[
             {
              sort: self.getReactively('sort')
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
        },function(){
          self.loading = false;
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
  var templateUrl = 'app/customerComponents/pages/' + name + '/' + name + '.html';
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
        input: '<',
        output: '&',
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