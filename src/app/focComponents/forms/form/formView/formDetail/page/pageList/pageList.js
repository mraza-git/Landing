(function ()
{
    'use strict';

    var name = 'pageList'; // Change This with Component Name
    var main = 'page'; // Change this with containing folder name
    var template = '<page-list></page-list>'; // Change this with appropriate string.
    /**
     * 
     * 
     * @param {any} $mdDialog
     */
    function ControllerFunction($mdDialog){
      'ngInject';
      ///////////Initialization Checks///////////
      var self = this;
      self.index = 0;
      ///////////Data///////////
      if(self.pages){
        self.index = self.pages.length;
        self.currentPage = self.pages[0];
      }



      ///////////Methods Declarations///////////
      self.done = done;
      self.addPageAtEnd = addPageAtEnd;
      self.openAddPageModal = openAddPageModal;
      self.setCurrentPage = setCurrentPage;


      ///////////Method Definitions///////////
      /**
       * Update the parent component
       * 
       * @param {any} event
       */
      function done(event){
        self.update(event);
      }
      /**
       * Adds page at the end of the pages
       * 
       * @param {any} event
       */
      function addPageAtEnd(event){        
         if(self.pages){
           self.index = self.pages.length;
         }
         self.openAddPageModal(event);
      }
      /**
       * Opens a model for adding a new page.
       * 
       * @param {any} ev
       */
      function openAddPageModal(ev){
        $mdDialog.show({
                controller       : CreatePageDialogController,
                controllerAs  : 'page',
                locals             : {
                    selectedPage: undefined,
                    pages: self.pages,
                    index: self.index,
                },
                templateUrl    : 'app/focComponents/forms/form/modalBoxes/pageCreate-dialog/pageCreate-dialog.html',
                parent             : angular.element(document.body),
                targetEvent     : ev,
                clickOutsideToClose: true
            }).then(function(pages,page){
              if(pages){                
                self.pages = pages;                
                self.done();
              }
            });
      }

      /**
       * sets the selected page as currentPage.
       * 
       * @param {any} page
       * @param {any} index
       */
      function setCurrentPage(page,index){
        self.currentPage = page;        
        self.index = index;
      }


    }

  var templateUrl = 'app/focComponents/forms/form/formView/formDetail/page/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
  .module(name, [
    'angular-meteor',
    'pageTools',
    'pageDetail',
    'pageRemove',
  ])
  .component(name,{
    templateUrl: templateUrl,
    controller: controller,
    controllerAs: name,
    bindings:{
      pages: '=',
      update: '&',
    }
  });


})();
