var Categories = new Meteor.Collection('categories');
var Thumbs96 = new Meteor.Collection('thumbs96');
var Thumbs40 = new Meteor.Collection('thumbs40');
var Images = new Meteor.Collection('images');
var Services = new Meteor.Collection('services');

var FocForms = new Meteor.Collection('forms');
var Settings = new Meteor.Collection('settings');
var Icons = new Meteor.Collection('icons');
var EmailList = new Meteor.Collection('emaillist');
var Leads = new Meteor.Collection('leads');
var Quotes = new Meteor.Collection('quotes');
var Counts = new Mongo.Collection('counts');

Counts.get = function  (name) {
  var count = this.findOne(name);
  return count && count.count || 0;
};

Meteor.subscribe("categories");
Meteor.subscribe("services");
Meteor.subscribe("settings");











(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',
            'angular-meteor',
            'thumbImage',


            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',
            'app.coming-soon',

            // Sample
            // 'app.sample',


            'formMain',
            //Customer landing and related.
            'landing',
            'aboutUs',
            'profile',
            'faq',
            'terms',
            'howitWorks',
            'contactUs',
            'privacyPolicy',
            'partnerList',
            'activeJobs',
            'assignedJobs',
            'archiveJobs',
            'jobDetail',
            'quoteDetail',
            'jobs',

            //supplier
            'p', // profile view page or supplier homepage
            'proRegister', // supplier registeration page
            'proLogin', // supplier login page
            'proDetail', // supplier profile detail page.
            'proFaq',
            'proHowitworks',
            'proTerms',
            'projects',
            'projectsList',


        ]);
})();



var isSupplier = {
        user: function($stateParams,$q,$mdToast,$timeout){
          var defer = $q.defer();
          Roles.subscription = Meteor.subscribe("_roles",null,
          {
            onReady:function(){
              if(Roles.userIsInRole(Meteor.userId(),'supplier','supplier-group')){                
                defer.resolve();
              }else{
                $mdToast.show(
                $mdToast.simple()
                .textContent('You are not a supplier')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
                  defer.reject();
                
              }
            },
            onStop: function(){
              $mdToast.show(
                $mdToast.simple()
                .textContent('There is no such record.')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
              defer.reject();
            }
          }
          );

          $timeout(function(){
            $mdToast.show(
                $mdToast.simple()
                .textContent('Server time out')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
                  defer.reject();
                  
                },5000);


          return defer.promise;

        }
      };



      var isAdmin = {
        user: function($stateParams,$q,$mdToast,$timeout){
          var defer = $q.defer();
          Roles.subscription = Meteor.subscribe("_roles",null,
          {
            onReady:function(){
              if(Roles.userIsInRole(Meteor.userId(),'admin','default-group')){                
                defer.resolve();
              }else{
                $mdToast.show(
                $mdToast.simple()
                .textContent('You are not an Admin')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
                  defer.reject();
                
              }
            },
            onStop: function(){
              $mdToast.show(
                $mdToast.simple()
                .textContent('There is no such record.')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
              defer.reject();
            }
          }
          );

          $timeout(function(){
            $mdToast.show(
                $mdToast.simple()
                .textContent('Server time out')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
                  defer.reject();
                  
                },5000);


          return defer.promise;

        }
      };


      var isClient = {
        user: function($stateParams,$q,$mdToast,$timeout){
          var defer = $q.defer();
          Roles.subscription = Meteor.subscribe("_roles",null,
          {
            onReady:function(){
              if(!!Meteor.userId()){                
                defer.resolve();
              }else{
                $mdToast.show(
                $mdToast.simple()
                .textContent('You are not loggedIn')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
                  defer.reject();
                
              }
            },
            onStop: function(){
              $mdToast.show(
                $mdToast.simple()
                .textContent('There is no such record.')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
              defer.reject();
            }
          }
          );

          $timeout(function(){
            $mdToast.show(
                $mdToast.simple()
                .textContent('Server time out')
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
                  defer.reject();
                  
                },5000);


          return defer.promise;

        }
      };
