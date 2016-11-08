(function() {
  'use strict';

  var main = 'projects'; // Change this with containing folder name
  var type = 'Nav'; // Change This with Component functionality Detail, Add, Remove, Delete, List etc.

  function ControllerFunction($scope,$reactive,$mdDialog,$mdMedia,$mdToast) {
    'ngInject';


    ///////////Initialization Checks///////////
    var self = this;
    self.limit = 5;
    self.searchText = "";
    self.selectedService = null;
    // self.minDate = new Date('12/01/2016');
    self.minDate = new Date('01/01/2016');    
    self.today = new Date();  
    
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
    self.searchTextContent = searchTextContent;
    self.filterDate = filterDate;
    self.clearFilters = clearFilters;


    


    ///////////Method Definitions///////////
    function searchTextContent(){
      self.search = self.searchText;
    }
    function filterDate(){
      self.dates = {
        from: self.startDate,
        to: self.endDate
      };
    }
    function clearFilters(){
      self.startDate = null;
      self.endDate = null;
      self.dates = undefined;
      self.searchText = "";
      self.search = "";
      self.selectedService = null;
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
        search : '=',
        dates: '=',
      }
    });


})();
