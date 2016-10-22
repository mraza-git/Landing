var name = 'fileUpload';
angular.module(name, [
  'angular-meteor',
   'ngFileUpload',
   'ngImgCrop',
]).component(name, {
    templateUrl: "app/sharedComponents/FileUpload/fileUpload.html",
    bindings: {
        okToSave: '<',
        done: '&',
        cropSettings: '<',

    },
    controllerAs: name,

    controller: FileUpload
});


function FileUpload($scope, $reactive) {
    var vm = this;
    vm.save = save;
    vm.reset = reset;
    vm.addImage = addImage;
    vm.cropDone = cropDone;
    vm.cropNow = cropNow;

    if(angular.isUndefined(vm.cropSettings.resultImageSize)){
        vm.cropSettings.resultImageSize = 'max';
        console.log('Image size undefined');
    }
    

    $reactive(vm).attach($scope);
    vm.uploaded = {};
    if (vm.cropSettings) {
        vm.crop = vm.cropSettings.crop || false;
    }

    // watch if its ok to save.
    vm.autorun(function () {
        if (vm.getReactively('okToSave')) {
            vm.save();
        }
    });



    function addImage(files) {
        if (files.length) {
            vm.currentFile = files[0];
            const reader = new FileReader;

            reader.onload = vm.$bindToContext(function (e) {
                if (vm.crop) {
                    vm.cropImgSrc = e.target.result;
                    vm.cropNow();
                    vm.myCroppedImage = '';
                }
                else {
                    vm.myCroppedImage = e.target.result;
                    vm.cropDone();
                }
            });

            reader.readAsDataURL(files[0]);
        } else {
            vm.cropImgSrc = undefined;
        }
    }

    function cropDone() {
        if (vm.myCroppedImage) {
            vm.croppedImage = angular.copy(vm.myCroppedImage);
            vm.cropIsDone = true;
            if (vm.okToSave)
                vm.save();
        }
    }

    function cropNow() {
        vm.cropIsDone = false;
    }

    function save() {
        if (!vm.croppedImage) {
            vm.reset();
            vm.done();
            return;
        }
        vm.uploading = true;
        upload(vm.croppedImage, vm.currentFile.name, function (file, progress){
           vm.progress = progress * 100;
           $scope.$apply();
        },
        function (file) {
             vm.uploaded = file;
             vm.uploading = false;
             vm.done({
                 $event: {
                     file: { id: file._id, url: file.url }
                 }
             });
             vm.reset();
         }, function (e) {
             // error uploading
             console.log("Error Uploading:", e)
         });


        ////

    }

    function reset() {
        vm.cropImgSrc = undefined;
        vm.myCroppedImage = '';
    }
}



