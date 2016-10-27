(function () {
  'use strict';


  var main = 'foc'; // Change this with containing folder name
  var type = 'Gmap';

  function ControllerFunction($scope,$reactive,$timeout) {
    'ngInject';
    var self = this;
    /////////////////Data/////////////////////
    $reactive(self).attach($scope);
    self.myScopeVar = {};
    self.refresh = true;
    self.geoLocation = {
      latitude: 25,
      longitude: 55,
    };    

    ///////////Methods Declarations///////////
    self.init = init;
    self.setLocation = setLocation;
    self.updateLocation = updateLocation;
    

    var handle=$scope.$watch('location',function(newValue,oldValue){     
      if(newValue){
        console.log("update center");
        self.init();        
        handle();
      }else{
        self.map = {};
        self.map.center = angular.copy(self.geoLocation);
        self.init();        
      }
    });

    ///////////Initialization/////////////////


    ////////////Method Definitions////////////
    function init() {
      console.log(self.readonly);      
        self.map = {        
        zoom: 13,
        visualRefresh : true,
        options: {
              minZoom: 3,
              scrollwheel: true,
              draggable: true,
        },
        events: {
          click: function (mapModel, eventName, originalEventArgs) {
            if(!self.readonly){
              self.setLocation(originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());            
              $scope.$apply();
            }
          }
        }
      };

      if(angular.isUndefined(self.location)){
        self.location = self.geoLocation;
      }
      
      self.map.center = angular.copy(self.location);

      self.marker = {
        options: {
          draggable: true,
        },
        events: {
          dragend: function (marker, eventName, args) {
            self.setLocation(marker.getPosition().lat(), marker.getPosition().lng());            
            $scope.$apply();
          }
        }
      };     
      // self.marker.options ={};
      // self.marker.options.draggable = !self.readonly || true;
      self.refresh=false; 
      
    }

    function updateLocation() {
      self.setLocation(self.myScopeVar.geometry.location.lat(), self.myScopeVar.geometry.location.lng());
      // self.map.center = angular.copy(self.location);      
      self.location.title = self.myScopeVar.formatted_address;

    }

    function setLocation(latitude, longitude) {
      self.location = {
        latitude: latitude,
        longitude: longitude,
      };
    }



  }

  var name = main + type; // Change This with Component Name
  var templateUrl = 'app/adminComponents/forms/form/formView/formDetail/page/pageList/pageDetail/question/questionPreview/' + name + '/' + name + '.html';
  var controller = ControllerFunction;
  angular
    .module(name, [
      'uiGmapgoogle-maps',
      'google.places',
    ])
    .component(name, {
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: name,
      bindings: {
        location: '=',
        key:'<',
        readonly: '<',
      }
    }).config(config);

  function config(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBW4ItjG2AliSW34mMvRRCNiuiPMJpoFzc',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'places,weather,geometry,visualization'
    });
  }

})();