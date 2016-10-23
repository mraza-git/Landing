(function () {
    'use strict';





    function saveImageController($scope,$reactive) {
        'ngInject';
        var self= this;        
        $reactive(self).attach($scope);
        /////////// Method Declaration //////////////
        self.save = save;
        self.getBlob = getBlob;
        self.remove = remove;

        self.getBlob();        
        

        /////////// Method Definition //////////////
        // watch if its ok to upload.
        self.autorun(function () {
            if (self.getReactively('okToSave')) {
                self.uploading = false;
                self.uploaded = false;                
               self.save();
            }
        });
        
        function getBlob(){
            var reader = new FileReader;
            reader.onload = function (e) {
                self.blob = e.target.result;                    
                $scope.$apply();                
            }            
            reader.readAsDataURL(self.file);
        }
        function remove(){     
            if(self.imageId){
                Images.remove(self.imageId);
            }       
            self.delete();
        }

        function save() {        
        self.uploading = true;
        upload(self.blob, self.file.name, function (file, progress) {
                self.progress = progress * 100;
                self.sendProgress({
                    $event: {
                        progress:self.progress
                    }
                });
                $scope.$apply();
            },
            function (file) {                
                self.uploading = false;
                self.uploaded = true;
                self.imageId = file._id;
                self.done({
                    $event: {
                        file: {
                            id: file._id,
                            url: file.url
                        }
                    }
                }); 
                $scope.$apply();
                               
            },
            function (e) {
                // error uploading
                console.log("Error Uploading:", e)
            });
        }

    }

    angular
        .module('saveImage', [])
        .component('saveImage', {
            bindings: {
                file: '=',                
                okToSave: '=',
                done: '&',
                delete: '&',
                sendProgress: '&',
            },
            controller: saveImageController,
            controllerAs: 'saveImage',
            templateUrl: 'app/sharedComponents/filesUpload/saveImage/saveImage.html'

        });

}());