var Categories = new Meteor.Collection('categories');
var Thumbs96 = new Meteor.Collection('thumbs96');
var Thumbs40 = new Meteor.Collection('thumbs40');
var Images = new Meteor.Collection('images');
var Services = new Meteor.Collection('services');

var FocForms = new Meteor.Collection('forms');
var Settings = new Meteor.Collection('settings');
var Icons = new Meteor.Collection('icons');
Meteor.subscribe("categories");
Meteor.subscribe("services");
Meteor.subscribe("settings");
var EmailList = new Meteor.Collection('emaillist');


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
            'landing',


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
            'aboutUs',


        ]);
})();
