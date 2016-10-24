(function () {
  'use strict';

  var main = 'project'; // Change this with containing folder name
  var type = 'Gallery'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  /**
   * 
   * 
   * @param {any} $scope
   * @param {any} $stateParams
   */
  function ControllerFunction($scope,Lightbox) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;    
    ///////////Data///////////
    self.realImages = angular.copy(self.images);
    angular.forEach(self.realImages,function(value,index){
      self.realImages.thumbUrl = self.imagages[index];
    });

    ///////////Methods Declarations///////////
    self.done = done;
    self.openLightBoxModal = openLightBoxModal;

    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {      
      self.update(event);
    }    
    function openLightBoxModal(index){
      console.log('opening');
      Lightbox.openModal(self.images,index);
    }

  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/projectDetail/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',   
      'saveImage', 
      'mdLightbox',  
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {        
        images: '<',       
        
      }
    });   

})();