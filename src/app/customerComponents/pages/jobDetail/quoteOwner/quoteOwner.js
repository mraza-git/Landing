(function () {
  'use strict';


  var main = 'quote'; // Change this with containing folder name
  var type = 'Owner';

  function ControllerFunction($scope, $reactive, jobService) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    ///////////Data///////////      
    self.subscribe('userById', function () {
      return [
        [self.getReactively('ownerId')]
      ]
    });

    self.helpers({
      user: function () {
        return Meteor.users.findOne({
          _id: self.getReactively('ownerId')
        });
      },
      jobsCount: function () {
        return Counts.get('numberOfJobs');
      },
      job: function () {
        return Leads.findOne({
          _id: self.getReactively('quote.leadId')
        })
      },
      isShortListed: function(){
        var job =  self.getReactively('job');
        if(job)
        if('shortList' in job){
          return job.shortList.includes(self.getReactively('quote._id'))
        }
        return false;
      }
    });


    ///////////Methods Declarations///////////
    self.acceptOffer = acceptOffer;
    self.declineOffer = declineOffer;
    self.shortList = shortList;
    self.removeShortList = removeShortList;



    ///////////Method Definitions///////////
    function acceptOffer(ev) {
      ev.stopPropagation();
      jobService.acceptOffer(ev, self.quote, self.job);
    }

    function declineOffer(ev) {
      ev.stopPropagation();
      jobService.declineOffer(ev, self.quote, self.job);
    }

    function shortList(ev){
      ev.stopPropagation();
      jobService.shortList(self.quote,self.job);
    }

    function removeShortList(ev){
      ev.stopPropagation();
      jobService.removeShortList(self.quote,self.job);
    }

  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/customerComponents/pages/jobDetail/' + name + '/' + name + '.html';
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
      controllerAs: name,
      bindings: {
        ownerId: '<',
        quote: '<',
      }
    });
})();