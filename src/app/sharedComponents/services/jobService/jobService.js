(function () {
    'use strict';

    angular
        .module('jobServiceModule', [
            'angular-meteor',
            'ngMaterial'
        ])
        .service('jobService', serviceName);


    function serviceName($window, $q, $mdDialog, $mdToast) {
        'ngInject';
        this.updateJobFolder = updateJobFolder;
        this.moveTo = moveTo;        
        this.trashJob = trashJob;
        this.recover = recover;        
        this.duplicateJob = duplicateJob;
        this.acceptOffer = acceptOffer;
        this.declineOffer = declineOffer;
        this.shortList = shortList;
        this.removeShortList = removeShortList;
        this.openServiceListDialog = openServiceListDialog;


        /////////////////////////////////
        
        var defer = $q.defer();
        //////////////// Function Definitions ////////////////////////////
        function updateJobFolder(jobId, folder) {
            Leads.update({
                    _id: jobId
                }, {
                    $set: {
                        folder: folder
                    }
                },
                function (err, doc) {
                    if (err) {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('An Error occured.')
                            .position('top right')
                            .action('x')
                            .hideDelay(2000)
                        );
                        defer.reject(err);
                    } else {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('Record saved.')
                            .position('top right')
                            .action('x')
                            .hideDelay(2000)
                        );
                        defer.resolve(doc);
                    }
                }
            );
            return defer.promise;
        }

        
        function recover(ev, jobId) {
            var folder = "all";            
            return updateJobFolder(jobId, folder);
        }

        function moveTo(ev,jobId,folder){              
            var confirm = $mdDialog.confirm()
                .title(folder.toUpperCase())
                .textContent('Are you sure you want to ' + folder + ' this inquiry?')
                .ariaLabel(folder)
                .targetEvent(ev)
                .ok('Please do it')
                .cancel('No dont!!!!');
            return $mdDialog.show(confirm).then(function () {
                return updateJobFolder(jobId, folder);
            }, function () {
                // Canceled          
                return;
            });
        }

        function trashJob(ev, job) {
            var imageIds = [];            
            if ('images' in job && !job.duplicate) {
                imageIds = job.images.map(function (obj) {
                    return obj.id;
                });
                Meteor.call('deleteManyImages', imageIds, function (error, result) {
                    if (error) {
                        defer.reject(error)
                    } else {
                        Leads.remove({
                            _id: job._id
                        }, function (err, doc) {
                            if (err) {
                                defer.reject(err);
                            }
                            defer.resolve(result, doc);
                        });
                    }
                });
            } else {
                Leads.remove({
                    _id: job._id
                }, function (err, doc) {
                    if (err) {
                        defer.reject(err);
                    }
                    defer.resolve(doc);
                });
            }
            return defer.promise;
        }        

        function duplicateJob(job) {
            var j = angular.copy(job);
            delete j._id;
            j.createdAt = new Date();
            j.assignedTo = "";
            j.previouslyAssignedTo = "";
            j.quotes = [];
            j.quotedBy = [];
            j.status = 'open';
            j.updatedAt = null;
            if(!j.duplicate){
                j.duplicateOf = job._id;
                j.duplicate = true;
            }
            Leads.insert(j, function (err, doc) {
                if (err) {
                    defer.reject(err);
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Record duplicated.')
                        .position('top right')
                        .action('x')
                        .hideDelay(2000)
                    );                    
                    defer.resolve(doc);
                }
            });
            return defer.promise;
        }

        function acceptOffer(ev, quote, job) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to accept this offer?')
                .textContent('Click accept if you agree to our standard terms of service usage.')
                .ariaLabel('accept offer')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                Leads.update({
                        _id: job._id,
                    }, {
                        $set: {
                            assignedTo: quote.owner,
                            status: 'closed',
                            jobIsseDate: new Date().toISOString()
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
                                        .hideDelay(2000)
                                    );

                                } else {
                                    // Meteor Server Call here

                                    // Meteor.users.update(
                                    //   {
                                    //     _id:quote.owner,
                                    //   },
                                    //   {
                                    //     $push:
                                    //     {
                                    //       'business.jobs':self.job._id
                                    //     }
                                    //   },function(err,doc){
                                    //     if(err){
                                    //       console.log(err);
                                    //     }
                                    //   }
                                    // );

                                    $mdToast.show(
                                        $mdToast.simple()
                                        .textContent('Record saved.')
                                        .position('top right')
                                        .action('x')
                                        .hideDelay(2000)
                                    );

                                }
                            });
                        }

                    }

                );
            }, function () {

            });
        }

        function declineOffer(ev, quote, job) {
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
                    if (job.status === 'closed') {
                        Leads.update({
                            _id: job._id
                        }, {
                            $set: {
                                assignedTo: "",
                                previouslyAssignedTo: job.assignedTo,
                                status: 'open'

                            }

                        }, function (err, doc) {
                            if (err) {
                                console.log(err);
                            } else {
                                //Server call here...
                                //  Meteor.users.update(
                                //   {
                                //     _id:quote.owner,
                                //   },
                                //   {
                                //     $pull:
                                //     {
                                //       'business.jobs':self.job._id
                                //     }
                                //   },function(err,doc){
                                //     if(err){
                                //       console.log(err);
                                //     }else{
                                // 
                                //      }  
                                //   }
                                // );
                            }
                        });
                    } else {

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

        function shortList(quote, job) {
            Leads.update({
                    _id: job._id
                }, {
                    $push: {
                        shortList: quote._id
                    }
                },
                function (err, doc) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(doc);
                    }
                }
            );
            return defer.promise;
        }

        function removeShortList(quote, job) {
            Leads.update({
                    _id: job._id
                }, {
                    $pull: {
                        shortList: quote._id
                    }
                },
                function (err, doc) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(doc);
                    }
                }
            );
            return defer.promise;
        }


        function openServiceListDialog(ev,category) {            
            $mdDialog.show({
                controller: serviceSelectorModelController,
                controllerAs: 'serviceList',
                locals: {
                category: category,
                },
                templateUrl: 'app/customerComponents/landing/modelboxes/serviceSelector.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (res) {
                $mdDialog.hide();
            });
            }
        }

    
})();