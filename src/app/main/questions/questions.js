(function ()
{
  'use strict';

  var name = "questions";


  angular
  .module(name, [
    'angular-meteor',
    'formly',
    'mgo-angular-wizard',
    'formly',
    'uiGmapgoogle-maps',
    'formlyMaterial'])
    .component(name,{
      templateUrl: 'app/main/questions/questions.html',
      controller: questionsController,
      controllerAs: 'vm',
      bindings:{
        input:'<',
        output: '&',
      }
    })
    .config(config);
    function config(uiGmapGoogleMapApiProvider, formlyConfigProvider){
      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBW4ItjG2AliSW34mMvRRCNiuiPMJpoFzc',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
      });
      formlyConfigProvider.setType({
        name: 'gmap',
        template: '<div class="angular-google-map-container">'
        +'<label>{{to.label}}</label><hr>'
        +'<ui-gmap-google-map center="to.map.center"'
        +'events="to.map.events"'
        +'zoom="to.map.zoom">'
        +'<ui-gmap-marker coords="to.map.center"'
        +'  options="to.marker.options"'
        +'events="to.marker.events"'
        +'idKey="to.job._id">'
        +'</ui-gmap-marker>'
        +'</ui-gmap-google-map>'
        +'</div>',
      });
    }
    function questionsController($scope,$reactive,WizardHandler){
      var vm = this;

      vm.model={};
      vm.direction = true;

      vm.map = {
        center: {
          latitude: 25,
          longitude: 55,
        },
        zoom: 8,
        events: {
          click: function (mapModel, eventName, originalEventArgs)  {
            setLocation(originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());
            console.log(vm.model.location);
            $scope.$apply();
          }
        }
      };
      var setLocation = function (latitude, longitude) {
        vm.model.location = {
          latitude: latitude,
          longitude: longitude
        }
      }

      vm.marker = {
        options: {
          draggable: true
        },
        events: {
          dragend: function (marker, eventName, args)  {
            setLocation(marker.getPosition().lat(), marker.getPosition().lng());
            $scope.$apply();
          }
        }
      };
      vm.exitValidation = function(form) {
        var cs = WizardHandler.wizard().currentStepNumber();
        var ts = WizardHandler.wizard().totalStepCount();
        // if(vm.previousStep > cs ){
        //   // back;
        //   vm.previous = true;
        //   vm.next = false;
        // }
        // else{
        //   // next
        //   vm.previous = false;
        //   vm.next = true;
        // }
        vm.last =  cs === ts ?true:false;
        vm.first = cs === 1?true:false;

        vm.previousStep = cs;

        vm.valid = form && !form.$invalid;
        return vm.valid;
      };
      vm.testData = [
        {
          "id": 3,
          "label":"Option 3"
        },
        {
          "id": 1,
          "label":"Answer One 1"
        },
        {
          "id": 2,
          "label":"Option 2"
        },

      ];

      vm.fields = {
        pages : [
          {
            title: "Page 2",
            fields: [
              {
                key: 'select',
                type: 'select',
                templateOptions: {
                  label: 'select the best',
                  options: vm.testData,
                  labelProp: "label",
                  valueProp: "label",
                  multiple: true,
                  theme: "pinkTheme",
                  map: vm.map,
                  marker: vm.marker,
                  //required: true
                }
              },

            ],
          },

          {
            title: "Page 1",
            fields: [
              {
                key: 'map',
                type: 'gmap',
                templateOptions: {
                  label: 'Drag the map to center your location',
                  map: vm.map,
                  marker: vm.marker,
                  //required: true
                }
              },

            ],
          },
          {
            title: "Page 3",
            fields: [
              {
                key: 'First_name',
                type: 'input',
                templateOptions: {
                  label: 'First Name',
                  type: 'text',
                  //required: true
                },
              },
              {
                key: 'LN',
                type: 'input',
                templateOptions: {
                  label: 'Last Name',
                  type: 'text',
                  required: true
                },
                expressionProperties:{
                  "hideExpression": "!model.password"
                }
              },
              {
                key: 'password',
                type: 'input',
                templateOptions: {
                  label: 'Password',
                  type: 'password',
                  required: true
                }
              },
            ],

          }],
        };

        vm.originalFields = angular.copy(vm.fields);

        // function definition
        vm.finishWizard = function() {
          alert(JSON.stringify(vm.model), null, 2);
        }

      }

    })();
