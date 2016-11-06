(function ()
{
    'use strict';


    var name = "thumbImage";

    angular
        .module(name, ['angular-meteor'])
        .component(name,{
          templateUrl: 'app/sharedComponents/thumbImage/thumbImage.html',
          controller: ThumbImage,
          controllerAs: name,
          bindings:{
              imageId: '<',
              size: '@',
              imageClass: '@',
              url:'&',
          }
        });
        function ThumbImage($scope,$reactive){
            $reactive(this).attach($scope);
            if (this.size === '40') {
                this.subscribe('thumbs40', function () {
                    return [[this.getReactively('imageId')]] || [];
                });
            }
            else {
                this.subscribe('thumbs96', function () {
                    return [[this.getReactively('imageId')]] || [];
                });
            }

          this.helpers({
              thumb: function () {
                  if (this.size === '40') {
                      return Thumbs40.findOne({
                          originalId: this.getReactively('imageId', true)
                      });

                  } else {
                      return Thumbs96.findOne({
                          originalId: this.getReactively('imageId', true)
                      });
                  }

            }
          });
          this.autorun( function (){
              this.url({
                  $event: {
                      imageUrl: this.getReactively('thumb.url')
                  }
              });
          });




        }
})();