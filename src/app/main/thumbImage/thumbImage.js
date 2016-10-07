(function() {
  'use strict';


  var name = "thumbImage";

  angular
    .module(name, ['angular-meteor'])
    .component(name, {
      templateUrl: 'app/main/thumbImage/thumbImage.html',
      controller: ThumbImage,
      controllerAs: name,
      bindings: {
        imageId: '<',
        size: '@',
        imageClass: '@',
      }
    });
  // .config(config);
  // /** @ngInject */
  // function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
  // {
  // }
  /** @ngInject */
  function ThumbImage($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

    if (this.size === "96") {
      this.subscribe('thumbs96', function() {
        return [
          [this.getReactively('imageId')]
        ] || [];
      });
      // this.subscribe('singleThumb96');
    } else {
      this.subscribe('thumbs40', function() {
        return [
          [this.getReactively('imageId')]
        ] || [];
      });
      // this.subscribe('singleThumb96');
    }
    this.helpers({
      thumb: function() {
        if (this.size === "96") {
          return Thumbs96.findOne({
            originalId: this.getReactively('imageId', true)
          });
        } else {
          return Thumbs40.findOne({
            originalId: this.getReactively('imageId', true)            
          });
        }
      }
    });


  }
})();
