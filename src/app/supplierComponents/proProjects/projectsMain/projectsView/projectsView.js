(function () {
  'use strict';

  var main = 'projects'; // Change this with containing folder name
  var type = 'View'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope, $reactive, $mdDialog, $mdSidenav, $timeout) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    $reactive(self).attach($scope);
    self.perPage = 15;
    self.page = 1;
    self.sort = {
      createdAt: -1,
    }
    ///////////Data///////////    
    self.currentProject = undefined;
    self.loading = false;
    self.selectedProjects = [];
    self.selectedProject = undefined;
    Roles.subscription = Meteor.subscribe("_roles")

    self.helpers({
      currentUser: function () {
        return Meteor.user();
      },
      projects: function () {
        self.loading = true;
        var forms = [];
        var selector = {
          folder: {
            $nin: ['delete', 'archive']
          }
        };
        var folder = self.getReactively('currentFolder');
        if (folder !== 'all') {
          if (_.contains(['delete', 'archive', 'draft'], folder)) {
            selector = {
              $and: [{
                  folder: self.getReactively('currentFolder') || 'all'
                },
                // {folder: {$nin:['delete','archive']}},                
              ]
            };
          } else if (folder === 'quoted') {
            selector = {
              quotedBy: self.getReactively('currentUser._id')
            }
          } else if (folder === 'jobs') {
            selector = {
              assignedTo: self.getReactively('currentUser._id')
            }
          } else if (folder === 'favorites') {
            selector = {
              _id: {
                $in: self.getReactively('currentUser.business.favorites') || []
              }
            }
          }

        }
        var cursor = Leads.find(selector);

        if (self.loading) {
          self.currentProject = cursor.fetch()[0]; //populating the first item at the start.
          if (self.currentProject)
            self.loading = false;
        }

        return cursor;
      },
      isAdmin: function () {
        return Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group');
      }

    });

    self.subscribe('leads', function () {
      if (angular.isDefined(self.getReactively('selectedService._id'))) {
        self.selector = {serviceId:{$in:[self.getReactively('selectedService._id')] || []}}; 
        return [
          {
            sort: self.getReactively('sort'),
            limit: parseInt(self.perPage),
            skip: self.getReactively('page') * 15
          },
          self.selector
        ];
      } else {
        self.selector = {serviceId:{$in:self.getReactively('currentUser.business.serviceIds') || []}}; 
        console.log("called.",self.getReactively('page'));
        return [
          {
            sort: self.getReactively('sort'),
            limit: parseInt(self.perPage),
            skip: parseInt(self.getReactively('page')) * 7
          },
          self.selector
        ]
      }
    }
    // ,
    // {
    //   onReady: function(){
    //     /// loading ends here...
    //     console.log("ready bro");
    //   },
    //   onStop: function(err){
    //     /// no record found
    //     console.log('no record found or error: ',err);
    //   }
    // }
    );


    ///////////Methods Declarations///////////
    self.done = done;
    self.deselectProjects = deselectProjects;
    self.toggleListNav = toggleListNav;
    self.toggleSelectProjects = toggleSelectProjects;
    self.update = update;
    self.selectProjects = selectProjects;
    self.loadMore = loadMore;
    self.doSubscription = doSubscription; 


    



    ///////////Method Definitions///////////

    function done(event) {
      self.currentProject.isChanged = true;
    }

    function deselectProjects() {
      self.selectedProjects = [];
    }

    function toggleListNav(sidenavId) {
      $mdSidenav(sidenavId).toggle();
      self.listNavIsOpen = $mdSidenav(sidenavId).isOpen();
    }

    function toggleSelectProjects() {
      if (self.selectedProjects.length > 0) {
        self.deselectProjects();
      } else {
        self.selectProjects();
      }
    }


    function update() {
      var project = angular.copy(self.currentProject);
      var id = project._id;
      delete project._id;
      delete project.isChanged;
      Leads.update({
        _id: id
      }, {
        $set: project,
      }, function (err, docs) {
        if (err) {
          console.log("Error while saving project:", err);
        } else {
          console.log("Project Saved.", docs);
          self.currentProject.isChanged = false;
        }
      });

    }

    function selectProjects(key, value) {
      // Make sure the current selection is cleared
      // before trying to select new threads
      self.selectedProjects = [];

      for (var i = 0; i < self.projects.length; i++) {
        if (angular.isUndefined(key) && angular.isUndefined(value)) {
          self.selectedProjects.push(self.projects[i]);
          continue;
        }

        if (angular.isDefined(key) && angular.isDefined(value) && self.projects[i][key] === value) {
          self.selectedProjects.push(self.projects[i]);
        }
      }

    }
    function loadMore(){
      if(self.projects){
        // var length = self.projects.length;
        self.page=self.page+1;
        console.log(self.page);
        // self.doSubscription();
      }
    }

    function doSubscription(){
      self.subscribe('leads', function () {
      if (angular.isDefined(self.getReactively('selectedService._id'))) {
        self.selector = {serviceId:{$in:[self.getReactively('selectedService._id')] || []}}; 
        return [
          {
            sort: self.getReactively('sort'),
            limit: parseInt(self.perPage),
            skip: parseInt(self.getReactively('page'), -1) * self.perPage
          },
          self.selector
        ];
      } else {
        self.selector = {serviceId:{$in:self.getReactively('currentUser.business.serviceIds') || []}}; 
        return [
          {
            sort: self.getReactively('sort'),
            limit: parseInt(self.perPage),
            skip: parseInt(self.getReactively('page'), -1) * self.perPage
          },
          self.selector
        ]
      }
    },
    {
      onReady: function(){
        /// loading ends here...
        console.log("ready bro");
      },
      onStop: function(err){
        /// no record found
        console.log('no record found or error: ',err);
      }
    }
    );
    }






  }
  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/' + name + '/' + name + '.html';
  var controller = ControllerFunction;



  angular
    .module(name, [
      'angular-meteor',
      'leadmoveTo',
      'projectDetail',
      'projectsList',
      'infinite-scroll',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        index: '<',
        list: '=',
        done: '&',
        search: '<',
        currentProject: '=',
        currentFolder: '=',
        masterSettings: '<',

      }
    });


})();


/* ng-infinite-scroll - v1.3.0 - 2016-06-30 */
angular.module('infinite-scroll', []).value('THROTTLE_MILLISECONDS', null).directive('infiniteScroll', [
  '$rootScope', '$window', '$interval', 'THROTTLE_MILLISECONDS', function($rootScope, $window, $interval, THROTTLE_MILLISECONDS) {
    return {
      scope: {
        infiniteScroll: '&',
        infiniteScrollContainer: '=',
        infiniteScrollDistance: '=',
        infiniteScrollDisabled: '=',
        infiniteScrollUseDocumentBottom: '=',
        infiniteScrollListenForEvent: '@'
      },
      link: function(scope, elem, attrs) {
        var changeContainer, checkInterval, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handler, height, immediateCheck, offsetTop, pageYOffset, scrollDistance, scrollEnabled, throttle, unregisterEventListener, useDocumentBottom, windowElement;
        windowElement = angular.element($window);
        scrollDistance = null;
        scrollEnabled = null;
        checkWhenEnabled = null;
        container = null;
        immediateCheck = true;
        useDocumentBottom = false;
        unregisterEventListener = null;
        checkInterval = false;
        height = function(elem) {
          elem = elem[0] || elem;
          if (isNaN(elem.offsetHeight)) {
            return elem.document.documentElement.clientHeight;
          } else {
            return elem.offsetHeight;
          }
        };
        offsetTop = function(elem) {
          if (!elem[0].getBoundingClientRect || elem.css('none')) {
            return;
          }
          return elem[0].getBoundingClientRect().top + pageYOffset(elem);
        };
        pageYOffset = function(elem) {
          elem = elem[0] || elem;
          if (isNaN(window.pageYOffset)) {
            return elem.document.documentElement.scrollTop;
          } else {
            return elem.ownerDocument.defaultView.pageYOffset;
          }
        };
        handler = function() {
          var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
          if (container === windowElement) {
            containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
            elementBottom = offsetTop(elem) + height(elem);
          } else {
            containerBottom = height(container);
            containerTopOffset = 0;
            if (offsetTop(container) !== void 0) {
              containerTopOffset = offsetTop(container);
            }
            elementBottom = offsetTop(elem) - containerTopOffset + height(elem);
          }
          if (useDocumentBottom) {
            elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
          }
          remaining = elementBottom - containerBottom;
          shouldScroll = remaining <= height(container) * scrollDistance + 1;
          if (shouldScroll) {
            checkWhenEnabled = true;
            if (scrollEnabled) {
              if (scope.$$phase || $rootScope.$$phase) {
                return scope.infiniteScroll();
              } else {
                return scope.$apply(scope.infiniteScroll);
              }
            }
          } else {
            if (checkInterval) {
              $interval.cancel(checkInterval);
            }
            return checkWhenEnabled = false;
          }
        };
        throttle = function(func, wait) {
          var later, previous, timeout;
          timeout = null;
          previous = 0;
          later = function() {
            previous = new Date().getTime();
            $interval.cancel(timeout);
            timeout = null;
            return func.call();
          };
          return function() {
            var now, remaining;
            now = new Date().getTime();
            remaining = wait - (now - previous);
            if (remaining <= 0) {
              $interval.cancel(timeout);
              timeout = null;
              previous = now;
              return func.call();
            } else {
              if (!timeout) {
                return timeout = $interval(later, remaining, 1);
              }
            }
          };
        };
        if (THROTTLE_MILLISECONDS != null) {
          handler = throttle(handler, THROTTLE_MILLISECONDS);
        }
        scope.$on('$destroy', function() {
          container.unbind('scroll', handler);
          if (unregisterEventListener != null) {
            unregisterEventListener();
            unregisterEventListener = null;
          }
          if (checkInterval) {
            return $interval.cancel(checkInterval);
          }
        });
        handleInfiniteScrollDistance = function(v) {
          return scrollDistance = parseFloat(v) || 0;
        };
        scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
        handleInfiniteScrollDistance(scope.infiniteScrollDistance);
        handleInfiniteScrollDisabled = function(v) {
          scrollEnabled = !v;
          if (scrollEnabled && checkWhenEnabled) {
            checkWhenEnabled = false;
            return handler();
          }
        };
        scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
        handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
        handleInfiniteScrollUseDocumentBottom = function(v) {
          return useDocumentBottom = v;
        };
        scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
        handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
        changeContainer = function(newContainer) {
          if (container != null) {
            container.unbind('scroll', handler);
          }
          container = newContainer;
          if (newContainer != null) {
            return container.bind('scroll', handler);
          }
        };
        changeContainer(windowElement);
        if (scope.infiniteScrollListenForEvent) {
          unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
        }
        handleInfiniteScrollContainer = function(newContainer) {
          if ((newContainer == null) || newContainer.length === 0) {
            return;
          }
          if (newContainer.nodeType && newContainer.nodeType === 1) {
            newContainer = angular.element(newContainer);
          } else if (typeof newContainer.append === 'function') {
            newContainer = angular.element(newContainer[newContainer.length - 1]);
          } else if (typeof newContainer === 'string') {
            newContainer = angular.element(document.querySelector(newContainer));
          }
          if (newContainer != null) {
            return changeContainer(newContainer);
          } else {
            throw new Error("invalid infinite-scroll-container attribute.");
          }
        };
        scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
        handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
        if (attrs.infiniteScrollParent != null) {
          changeContainer(angular.element(elem.parent()));
        }
        if (attrs.infiniteScrollImmediateCheck != null) {
          immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
        }
        return checkInterval = $interval((function() {
          if (immediateCheck) {
            handler();
          }
          return $interval.cancel(checkInterval);
        }));
      }
    };
  }
]);

if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
  module.exports = 'infinite-scroll';
}
