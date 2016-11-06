(function() {
  'use strict';

  var main = 'projects'; // Change this with containing folder name
  var type = 'Nav'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,$mdDialog,$mdMedia,$mdToast) {
    'ngInject';


    ///////////Initialization Checks///////////
    var self = this;
    self.limit = 5;
    self.iconSearch = "";    
    $reactive(self).attach($scope);
    ///////////Data///////////
    self.helpers({
      currentUser: function(){
        return Meteor.user();
      },
      services: function(){
        return Services.find({
          _id: {$in: self.getReactively('currentUser.business.serviceIds') || []}
        });
      }
    });


    ///////////Methods Declarations///////////
    self.openQuoteDialog = openQuoteDialog;
    self.setService = setService;


    // self.openEditDialog = openEditDialog;



    ///////////Method Definitions///////////
    function setService(){
      // console.log(self.selectedService);
    }
    function openQuoteDialog(ev){
      if(angular.isUndefined(self.currentProject)){
         $mdToast.show(
          $mdToast.simple()
          .textContent('Please select a lead first....')               
          .position('top right')
          .action('x')
          .hideDelay(3000)
        );
        return;
      }
      $mdDialog.show({
              controller       : QuoteDialogController,
              controllerAs  : 'quote',
              locals             : {
                  currentProject: self.currentProject
              },
              templateUrl    : 'app/supplierComponents/proProjects/modalBoxes/quoteCreate-dialog/quoteCreate-dialog.html',
              parent             : angular.element(document.body),
              targetEvent     : ev,
              clickOutsideToClose: true,
              fullscreen: $mdMedia('sm') || $mdMedia('xs')
          }).then(function(res){
            if(res){
              console.log(res);              
            }
          });
    }



  }


  var name = main + type;
  var templateUrl = 'app/supplierComponents/proProjects/projectsMain/'+ name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'angular-meteor',
      'ngMessages',
      'projectsFolders',
      'ngMessages'
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        selectedService: '=',        
        currentFolder: '=',
        currentProject: '=',
      }
    });


})();
