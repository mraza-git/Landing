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
  function ControllerFunction($scope,$reactive) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;       
    $reactive(self).attach($scope);
    ///////////Data///////////    
    self.images = self.images ||[];

    ///////////Methods Declarations///////////
    self.done = done;
    self.remove = remove;

    

    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {      
      self.update(event);
    }    

    function remove(id,index,event){
      if(event){
        event.stopPropagation();
      }
      Images.remove({_id:id},function(error,doc){
        console.log(error);
        console.log(doc);
      });      
      self.images.splice(index,1);
      if(self.saveNow){
        self.saveNow();
      }
    }
    

  }

  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/projectsView/projectDetail/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',   
      'saveImage',      
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {        
        images: '<', 
        readonly: '<',
        saveNow: '&',      // save original document.
        inline: "<",
      }
    });   

})();