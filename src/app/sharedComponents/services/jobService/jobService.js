(function () {
    'use strict';

    angular
        .module('jobServiceModule', [
            'angular-meteor',
            'ngMaterial'
        ])
        .service('jobService', serviceName);


    /**
     * Service for Lead and Quote Management.
     * Functions for both customer and supplier.
     * @param {any} $window
     * @param {any} $q
     * @param {any} $mdDialog
     * @param {any} $mdToast
     */
    function serviceName($window, $q, $mdDialog, $mdToast) {
        'ngInject';
        this.updateJobFolder = updateJobFolder;
        this.moveTo = moveTo;
        this.trashJob = trashJob;
        this.recover = recover;
        this.duplicateJob = duplicateJob;
        this.acceptOffer = acceptOffer;
        this.approveProjectOffer = approveProjectOffer;
        this.declineProjectOffer = declineProjectOffer;
        this.declineOffer = declineOffer;
        this.shortList = shortList;
        this.removeShortList = removeShortList;
        this.openServiceListDialog = openServiceListDialog;
        this.updateCustomerShowNumberCount = updateCustomerShowNumberCount;


        /////////////////////////////////

        var defer = $q.defer();
        //////////////// Function Definitions ////////////////////////////
        
        /**
         * Updates the Lead status delete/archieve, helper function for moveTo and recover.
         * Customer Side
         * @param {any} jobId
         * @param {any} folder
         * @returns
         */        
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
       
       
        /**
         * Recover from a particular folder and put back in access
         * Admin side for delete and customer side for archieve.
         * @param {any} ev
         * @param {any} jobId
         * @returns
         */
        function recover(ev, jobId) {
            var folder = "all";
            return updateJobFolder(jobId, folder);
        }

        /**
         * Move to a particular folder e.g. delete/archieve
         * customer side.
         * @param {any} ev
         * @param {any} jobId
         * @param {any} folder
         * @returns
         */
        function moveTo(ev, jobId, folder) {
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

        /**
         * Complete removes a lead along with its images and other data.
         * admin side.
         * @param {any} ev
         * @param {any} job
         * @returns
         */
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

        /**
         * Repost or duplicate Lead. only possible
         * 
         * @param {any} job
         * @returns
         */
        function duplicateJob(job) {
            var j = angular.copy(job);
            delete j._id;
            j.createdAt = new Date();
            j.assignedTo = [];
            j.previouslyAssignedTo = "";
            j.quotes = [];
            j.quotedBy = [];
            j.status = 'open';
            j.updatedAt = null;
            if (!j.duplicate) {
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

        /**
         * 
         * 
         * @param {any} ev
         * @param {any} quote
         * @param {any} job
         */
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
                            status: 'awaiting',
                        },
                        $addToSet: {
                            assignedTo: {
                                owner: quote.owner,
                                quote: quote._id,
                                price: quote.quotedValue
                            },
                            shortList: quote._id,
                        },
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
                                    Meteor.call('assignUserAJob', job._id, quote.owner, function (err, result) {
                                        if (err) console.log(err);

                                    });

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

        /**
         * 
         * 
         * @param {any} ev
         * @param {any} quote
         * @param {any} job
         */
        function approveProjectOffer(ev, quote, job) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to accept this project?')
                .textContent('Click accept if you agree to our standard terms of service usage.')
                .ariaLabel('accept offer')
                .targetEvent(ev)
                .ok('Accept')
                .cancel('Decline');

            $mdDialog.show(confirm).then(function () {
                    Quotes.update({
                        _id: quote._id
                    }, {
                        $set: {
                            status: 'approved'
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
                            // Meteor.call('assignUserAJob',job._id,quote.owner,function(err,result){
                            //     if(err)console.log(err);
                            // });

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

            );

        }

        /**
         * 
         * 
         * @param {any} ev
         * @param {any} quote
         * @param {any} job
         */
        function declineProjectOffer(ev, quote, job) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to deline this project?')
                .textContent('you will lose this job and cannot requote or update.')
                .ariaLabel('reject project')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                    Quotes.update({
                        _id: quote._id
                    }, {
                        $set: {
                            status: 'declined'
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
                            // Meteor.call('assignUserAJob',job._id,quote.owner,function(err,result){
                            //     if(err)console.log(err);
                            // });

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

            );

        }

        /**
         * 
         * 
         * @param {any} ev
         * @param {any} quote
         * @param {any} job
         */
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
                        var status;
                        if (job.assignedTo.length <= 1) {
                            status = 'open';
                        } else {
                            status = 'closed';
                        }
                        Leads.update({
                            _id: job._id
                        }, {
                            $set: {
                                //     assignedTo:[],                                                                
                                status: status,
                            },
                            $pull: {
                                assignedTo: {
                                    owner: quote.owner,
                                    quote: quote._id,
                                    price: quote.quotedValue
                                },
                            }

                        }, function (err, doc) {
                            if (err) {
                                console.log(err);
                            } else {
                                Meteor.call('unassignUserAJob', job._id, quote.owner, function (err, result) {
                                    if (err) console.log(err);
                                });

                                $mdToast.show(
                                    $mdToast.simple()
                                    .textContent('Record saved.')
                                    .position('top right')
                                    .action('x')
                                    .hideDelay(5000)
                                );
                            }
                        });
                    } else {

                    }
                }
            });

        }

        /**
         * 
         * 
         * @param {any} quote
         * @param {any} job
         * @returns
         */
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

        /**
         * 
         * 
         * @param {any} quote
         * @param {any} job
         * @returns
         */
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

        /**
         * 
         * 
         * @param {any} quote
         * @returns
         */
        function updateCustomerShowNumberCount(quote){
            Quotes.update(quote._id,
                {
                    $inc:{callCustomer:1}
                },
                function(err,doc){
                    if(err){               
                        defer.reject();         
                    }else{
                        defer.resolve(doc);
                    }

                }
            );
            return defer.promise;
        }


        /**
         * 
         * 
         * @param {any} ev
         * @param {any} category
         */
        function openServiceListDialog(ev, category) {
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