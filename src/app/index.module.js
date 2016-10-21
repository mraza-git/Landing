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
            'faq',
            'terms',
            'howitWorks',
            'contactUs',
            'privacyPolicy',
            'partnerList',

            //supplier
            'p', // profile view page or supplier homepage
            'proRegister', // supplier registeration page
            'proLogin', // supplier login page
            'proDetail', // supplier profile detail page.
            'proFaq',
            'proHowitworks',
            'proTerms',


        ]);
})();
