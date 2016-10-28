(function () {
  'use strict';


  var main = 'job'; // Change this with containing folder name
  var type = 'Detail';

  function ControllerFunction($scope, $reactive, $stateParams, $state, $mdDialog, $mdToast) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    if ($stateParams.jobId) {
      self.jobId = $stateParams.jobId;
    }
    ///////////Data///////////
    self.subscribe('quoteByLeadId', function () {
      return [
        [self.jobId]
      ];
    });
    self.subscribe('leadsByIds', function () {
      return [
        [self.jobId]
      ]
    })
    self.helpers({
      quotes: function () {
        return Quotes.find({
          leadId: self.jobId,
        });
      },
      job: function () {
        return Leads.findOne({
          _id: self.jobId
        })
      }
    });

    ///////////Methods Declarations///////////
    self.getLocation = getLocation;
    self.acceptOffer = acceptOffer;
    self.declineOffer = declineOffer;

    ///////////Method Definitions///////////
    self.autorun(function () {
      if (self.getReactively('job')) {
        self.getLocation('gmap');
      }

    });

    function acceptOffer(ev, quote) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to accept this offer?')
        .textContent('Click accept if you agree to our standard terms of service usage.')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Accept')
        .cancel('Decline');

      $mdDialog.show(confirm).then(function () {
        Leads.update({
            _id: self.job._id,
          }, {
            $set: {
              assignedTo: quote.owner,
              status: 'closed'
            }
          },
          function (err, doc) {
            if (err) {
              $mdToast.show(
                $mdToast.simple()
                .textContent('There was an error saving, try again later')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );

            } else {
              Quotes.update({
                _id: quote._id
              }, {
                $set: {
                  status: 'accepted'
                }
              }, function (err, doc) {
                if (err) {
                  console.log(err);
                  $mdToast.show(
                    $mdToast.simple()
                    .textContent('There was an error saving, try again later')
                    .position('top right')
                    .action('x')
                    .hideDelay(5000)
                  );

                } else {
                  $mdToast.show(
                    $mdToast.simple()
                    .textContent('Record saved.')
                    .position('top right')
                    .action('x')
                    .hideDelay(5000)
                  );
                  
                }
              });
            }

          }

        );
      }, function () {

      });

    }

    function declineOffer(ev, quote) {
      Quotes.update({
        _id: quote._id
      }, {
        $set: {
          status: 'rejected'
        }
      }, function (err, doc) {
        if (err) {
          console.log(err);
          $mdToast.show(
            $mdToast.simple()
            .textContent('There was an error saving, try again later')
            .position('top right')
            .action('x')
            .hideDelay(5000)
          );

        } else {
          if(self.job.status==='closed'){            
            Leads.update(
              {
                _id: self.job._id
              },
              {
                $set:
                {
                  assignedTo: "",
                  previouslyAssignedTo: self.job.assignedTo,                  
                  status: 'open'                  

                }

              }
            );
          }else{
            $mdToast.show(
              $mdToast.simple()
              .textContent('Record saved.')
              .position('top right')
              .action('x')
              .hideDelay(5000)
            );
          }
        }
      });

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
  var state = 'app.' + name.toLowerCase();
  var stateUrl = '/' + main + '-' + type.toLowerCase() + '/:jobId';
  var views = {
    'main@': {
      templateUrl: 'app/core/layouts/content-with-toolbar.html',
      controller: "MainController as self"
    },
    'content@app.jobdetail': {
      template: template,
    },
    'toolbar@app.jobdetail': {
      template: '<landing-toolbar></landing-toolbar>',

    }

  };
  /** @ngInject */
  function config($stateProvider) {
    // State
    $stateProvider
      .state(state, {
        url: stateUrl,
        views: views,

      });
  }

})();