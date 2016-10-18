(function () {
  'use strict';

  var name = 'pageList'; // Change This with Component Name
  var main = 'page'; // Change this with containing folder name
  var template = '<page-list></page-list>'; // Change this with appropriate string.
  /**
   * 
   * 
   * @param {any} $mdDialog
   */
  function ControllerFunction($mdDialog,$mdMedia) {
    'ngInject';
    ///////////Initialization Checks///////////
    var self = this;
    self.index = 0;
    self.currentPage = {};
    ///////////Data///////////
    if (self.pages) {
      // self.index = self.pages.length;
      self.currentPage = self.pages[0];
    }



    ///////////Methods Declarations///////////
    self.done = done;
    self.addPageAtEnd = addPageAtEnd;
    self.openAddPageModal = openAddPageModal;
    self.openEditPageModal = openEditPageModal;
    self.deletePage = deletePage;
    self.openAddQuestionModal = openAddQuestionModal;
    self.setCurrentPage = setCurrentPage;


    ///////////Method Definitions///////////
    /**
     * Update the parent component
     * 
     * @param {any} event
     */
    function done(event) {
      self.update(event);
    }
    /**
     * Adds page at the end of the pages
     * 
     * @param {any} event
     */
    function addPageAtEnd(event) {
      if (self.pages) {
        self.index = self.pages.length;
      }
      self.openAddPageModal(event);
    }
    function deletePage(ev){
      if(self.index){
        self.pages.splice(self.index,1);
        self.done();
      }
    }

    function openEditPageModal(ev){      
      self.openAddPageModal(ev);
    }
    /**
     * Opens a model for adding a new page.
     * 
     * @param {any} ev
     */
    function openAddPageModal(ev) {            
      $mdDialog.show({
        controller: CreatePageDialogController,
        controllerAs: 'page',
        locals: {
          selectedPage: self.pages[self.index],
          pages: self.pages,
          index: self.index,
        },
        templateUrl: 'app/adminComponents/forms/form/modalBoxes/pageCreate-dialog/pageCreate-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function (pages, page) {
        if (pages) {
          self.pages = pages;
          self.done();
        }
      });
    }

    /**
     * Opens a model for adding a new question.
     * 
     * @param {any} ev
     */
    function openAddQuestionModal(ev) {
      if(!self.pages){
        console.log("No page found... error adding a question");
        return;
      }
      if(!self.currentPage){
        self.currentPage = self.pages[0];
        
      }
      $mdDialog.show({
        controller: CreateQuestionDialogController,
        controllerAs: 'question',
        locals: {
          selectedQuestion: undefined,
          questions: self.currentPage.questions,
          index: 0,
        },
        templateUrl: 'app/adminComponents/forms/form/modalBoxes/questionCreate-dialog/questionCreate-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $mdMedia('sm') || $mdMedia('xs'),
      }).then(function (questions, question) {
        if (questions) {
          self.currentPage.questions = questions;          
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
    function setCurrentPage(page) {
      self.currentPage = page;
    }


  }

  var templateUrl = 'app/adminComponents/forms/form/formView/formDetail/page/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'pageTools',
      'pageDetail',
      'pageRemove',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        pages: '=',
        update: '&',
      }
    });


})();