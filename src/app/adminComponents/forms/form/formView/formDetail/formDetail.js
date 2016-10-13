(function () {
  'use strict';

  var main = 'form'; // Change this with containing folder name
  var type = 'Detail'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  /**
   * 
   * 
   * @param {any} $scope
   * @param {any} $stateParams
   */
  function ControllerFunction($scope, $stateParams) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    if ($stateParams.itemId) {
      self.itemId = $stateParams.itemId;
    }
    ///////////Data///////////


    ///////////Methods Declarations///////////
    self.done = done;
    // self.toggleFormStatus = toggleFormStatus;



    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {
      console.log('Form: ',self.currentForm);
      self.update(event);
    }

    /**
     * 
     * 
     * @param {any} key
     * @param {any} form
     * @param {any} event
     * @returns
     */
    // function toggleFormStatus(key, form, event) {
    //   // Stop the propagation if event provided
    //   // This will stop unwanted actions on button clicks
    //   if (event) {
    //     event.stopPropagation();
    //   }

    //   // If the form provided, do the changes on that
    //   // particular form
    //   if (form) {
    //     if (typeof (form[key]) !== 'boolean') {
    //       return;
    //     }

    //     form[key] = !form[key];
    //     return;
    //   }

    //   // If the current form is available, do the
    //   // changes on that one
    //   if (self.currentForm) {
    //     if (typeof (self.currentForm[key]) !== 'boolean') {
    //       self.currentForm[key] = true;
    //       return;
    //     }

    //     self.currentForm[key] = !self.currentForm[key];
    //     return;
    //   }

    //   // Otherwise do the status update on selected threads
    //   for (var x = 0; x < self.selectedThreads.length; x++) {
    //     if (typeof (self.selectedThreads[x][key]) !== 'boolean') {
    //       continue;
    //     }

    //     self.selectedThreads[x][key] = !self.selectedThreads[x][key];
    //   }
    // }

  }

  var name = main + type;
  var templateUrl = 'app/adminComponents/forms/form/formView/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'formServices',
      'pageList'
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        itemId: '<',
        update: '&',
        currentForm: '=',       
        
      }
    });   

})();