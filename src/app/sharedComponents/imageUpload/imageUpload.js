(function () {
    'use strict';

    angular
        .module('imageUpload', [
            'fileUpload'
        ])
        .component('imageUploadButton', 
            {
                bindings: {
                    icon: '@',
                    label: '@',
                    typeClass:'@',
                    type: '@',
                    cropSettings: '<', //{aspectRatio: 1, resultImageSize: {w:300,h:300}, crop:true|false, areaType:'circle | square | reactangle'}
                    update: '&' // returns an image object {file._id:string,file.url:string}
                },
                controller: imageUploadController,
                controllerAs: 'imageUpload',
                templateUrl:'app/sharedComponents/imageUpload/imageUpload.html'
            }
        );


    

        function imageUploadController($mdDialog, $mdMedia) {

            //////////////Data/////////////////////
            var vm = this;

            /////////////Method Declarations//////////////////
            vm.openChangePictureModal = openChangePictureModal



            /////////////Method Definitions///////////////////
            /**
             *  Opens a picture upload model depending on the provided settings.
             * 
             * @param {any} $event
             */
            function openChangePictureModal($event) {
                $mdDialog.show({
                        controller: function ($mdDialog,cropSettings) {
                            'ngInject';
                            this.cropSettings = cropSettings;
                            if(angular.isUndefined(cropSettings)){
                                this.cropSettings = {aspectRatio: 1, resultImageSize: {w:300,h:300}, crop:true, areaType:'circle'};
                            }
                            this.close = function () {
                                $mdDialog.hide(false);
                            }
                            this.done = function (event) {
                                if (event) {
                                    $mdDialog.hide(event);
                                }
                            }
                        },
                        controllerAs: 'imageModal',
                        templateUrl: 'app/sharedComponents/imageUpload/pictureModal.html',
                        targetEvent: $event,
                        locals:{
                            cropSettings:vm.cropSettings,
                        },
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        fullscreen: $mdMedia('sm') || $mdMedia('xs')
                    })
                    .then(function (event) {
                        if(vm.update){
                            vm.update({
                                $event:{
                                    file:event.file,
                                }
                            })
                        }            
                        else{
                            if(angular.isDefined(event.file)){
                                Images.remove(event.file._id);
                                console.log(event);

                            }
                            console.log('no update function defined.');
                        }
                    }, function (error) {
                        console.log('error:', error); // Modal/picture update error
                    });

            }

        }

}());