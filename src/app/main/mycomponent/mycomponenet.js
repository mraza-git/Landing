


(function ()
{
    'use strict';


    var name = "myComponent";

    angular
        .module(name, ['angular-meteor', 'thumbImage'])
        .component(name,{
          templateUrl: 'app/main/mycomponent/mycomponent.html',
          controller: A,
          controllerAs: 'vm',
          bindings:{
            message:'<',
            updated: '&',
          }
        })
        .config(config);
        /** @ngInject */
        function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
        {
          // State
          $stateProvider
          .state('app.mycomponent', {
            url    : '/mycomponent',
            views  : {
              'main@':{
                templateUrl: 'app/core/layouts/content-with-toolbar.html',
                controller: "MainController as vm"
              },
              'toolbar@app.mycomponent':{
                templateUrl: 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
                controller: "ToolbarController as vm"
              },
              'content@app.mycomponent': {
                template: '<sample-component></sample-component>',
              }
            },
            resolve: {
              SampleData: function (msApi)
              {
                return msApi.resolve('sample@get');
              }
            }

          });

          // Translation
          $translatePartialLoaderProvider.addPart('app/main/sample');

          // Api
          msApiProvider.register('sample', ['app/data/sample/sample.json']);

          // Navigation
          msNavigationServiceProvider.saveItem('fuse', {
            title : 'SAMPLE',
            group : true,
            weight: 1
          });

          msNavigationServiceProvider.saveItem('fuse.mycomponent', {
            title    : 'Component',
            icon     : 'icon-tile-four',
            state    : 'app.mycomponent',
            /*stateParams: {
            'param1': 'page'
          },*/
          translate: 'SAMPLE.SAMPLE_NAV',
          weight   : 1
        });
      }

    /** @ngInject */
    function A($scope,$reactive)
    {
        var vm = this;
         $reactive(this).attach($scope);

         vm.catLoading = true;
         vm.serLoading = true;
        // Data
        var handle = this.subscribe('categories',function(){return [];},{
         onStop: function(error){
          console.log('stoped: ',error);
        },
         onReady: function(){
            Meteor.setTimeout(function(){
              vm.catLoading = false;
              $scope.$apply();
              console.log("subscription ready");
            },2000);
            //handle.stop();
        }});

        this.subscribe('service',null,{
          onReady: function(){
            vm.serLoading = false;
        }});


        this.helpers({
          categories: function (){
            return Categories.find();
          },
          services:function(){
            return Services.find();
          }

        })
        console.log(Meteor.userId());

        this.getImageUrl = function(imageId){
          server.subscribe('thumbs40',function(){
            return [[imageId]] || [];
          });

        }

        // $scope.$watch('messages',function(newValue,oldValue){
        //   console.log("Inside watch",newValue);
        // })



        // Methods
        this.updateText=function(){
          this.updated({
            $event:{
              message:this.message,
              newmessage: this.message + " newMessage"
            }
          })
        }
        //////////
    }

})();
