(function ()
{
    'use strict';


    var name = "thumbImage";

    angular
        .module(name, ['angular-meteor'])
        .component(name,{
          templateUrl: 'app/main/thumbImage/thumbImage.html',
          controller: ThumbImage,
          controllerAs: name,
          bindings:{
            imageId:'<',
            imageClass: '@'
          }
        });
        // .config(config);
        // /** @ngInject */
        // function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
        // {
        // }
         /** @ngInject */
        function ThumbImage($scope,$reactive){
           $reactive(this).attach($scope);
          //  server.subscribe('thumbs96',function(){
          //   return [[this.getReactively('imageId',true)]];
          // });
          // this.helpers({
          //   thumb: function(){
          //     console.log(this.imageId);
          //     return Thumbs96.findOne({
          //       originalId: this.getReactively('imageId',true)
          //     });
          //   }
          // });

           this.subscribe('singleThumb40');

          this.helpers({
            thumb: function(){
              console.log(this.imageId);
              return Thumbs40.findOne({
                originalId: this.getReactively('imageId',true)
              });
            }
          });


        }
})();
