(function ()
{
    'use strict';


    var main = 'assigned'; // Change this with containing folder name
    var type = 'Job';
    function ControllerFunction($scope,$reactive,$stateParams,$state,$mdToast,jobService,returnUrlService){
      'ngInject';
      ///////////Initialization Checks///////////      
      $reactive(this).attach($scope);
      this.loadingNumber = false;

      ///////////Data///////////
      this.subscribe('leadsByIds',function(){
        this.loading = true;
        return [
          [$stateParams.jobId]
        ]
      });
      this.subscribe('userById',function(){
        return [
          [this.getReactively('job.owner')]
        ]
      });
      this.subscribe('quotesByIds',function(){
        return [
          this.getReactively('quoteIds')
        ];
      },{
        onReady: function(){
          
        }
      });
      

      this.helpers({
        isLoggedIn: function(){
          return !!Meteor.userId();
        },
        user: function(){
          return Meteor.user();
        },
        job: function (){
          return Leads.findOne($stateParams.jobId);
        },        
        customer: function(){
          return Meteor.users.findOne(this.getReactively('job.owner'));
        },
        quote: function(){
          var job = this.getReactively('job');                  
          if(job){
            var user = this.getReactively('user');
            if(user){
              var objectArray = job.assignedTo.filter((obj)=>{                
                return obj.owner===user._id
              });
              this.quoteIds = objectArray.map((obj)=>{
                return obj.quote;
              });
              if(this.quoteIds.length<1){
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('You are not aurthorized to view this page')
                    .position('top right')
                    .action('x')
                    .hideDelay(2000)
                );

                var returnUrl = {
                  stateName: $state.current.name,
                  stateParams: $state.params
                };
                returnUrlService.set(returnUrl);
                $state.go('app.proLogin');
              }else{
                this.loading = false;
              }
            }
          }
          return Quotes.find(
            {
              _id:{$in:this.quoteIds || []}
            }
          ).fetch()[0];
          
        }
      });
      ///////////Methods Declarations///////////
      this.acceptProject = acceptProject;
      this.declineProject = declineProject;
      this.showCustomerNumber = showCustomerNumber;



      ///////////Method Definitions///////////
      function acceptProject(ev){
        jobService.approveProjectOffer(ev,this.quote,this.job);
      }
      function declineProject(ev){
        jobService.declineProjectOffer(ev,this.quote,this.job);
      }
      
      function showCustomerNumber(ev){
        this.loadingNumber = true;
        jobService.updateCustomerShowNumberCount(this.quote).then((res)=>{          
            this.showNumber = true;
            this.loadingNumber = false;          
        });
      }

    }

  var name = type?main+type:main; // Change This with Component Name
  var templateUrl = 'app/supplierComponents/jobsPages/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',  
    'pagesToolbar',   
    'landingFooter',
    'jobServiceModule',
    'returnUrlModule',

    ])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      input:'<',
      output: '&',
    }
  })
  .config(config);

  var template = '<'+main+ (type?'-':'')+(type?type.toLowerCase():'')+'></'+main+(type?'-':'')+(type?type.toLowerCase():'')+'>';
  var state = 'app.'+name.toLowerCase();
  var stateUrl = '/assigned-job/:jobId';
  var views = {
    'main@': {
          templateUrl: 'app/core/layouts/content-with-toolbar.html',
          controller: "MainController as this"
    },
    'content@app.assignedjob': {
      template: template,
    },     
    'toolbar@app.assignedjob':{
      template: '<pages-toolbar></pages-toolbar>',      
    },
     
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
