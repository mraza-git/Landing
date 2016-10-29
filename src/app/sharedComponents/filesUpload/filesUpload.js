var name = 'filesUpload';
angular.module(name, [
    'angular-meteor',
    'ngFileUpload',
    'ngImgCrop',
    'saveImage',
]).component(name, {
    templateUrl: "app/sharedComponents/filesUpload/filesUpload.html",
    bindings: {
        okToSave: '<',
        uploadedFilesCount: '<',
        done: '&',
    },
    controllerAs: name,

    controller: FilesUpload
});


function FilesUpload($scope, $reactive,$mdMedia,$mdToast) {
    'ngInject';

    var self = this;
    self.uploaded = [];
    self.images = [];
    self.files=[];
    self.filesLimit = 15; // get it from subscription data.
    self.currentCount = 0;
    self.progressArray = [];
    self.count = 0;    
    self.progress = 0;
    $reactive(self).attach($scope);
    $scope.$mdMedia = $mdMedia;

    /////////// Method Declaration //////////////
    self.addImages = addImages;   
    self.updated = updated;
    self.setProgress = setProgress;
    self.filesSelected = filesSelected; 

    //////////// Method Definition //////////////
    //watch if its ok to upload.
    self.autorun(function () {
        if (self.getReactively('okToSave')) {
            if(self.files.length<=0){
                self.updated();                
            }
        }       
    });
    function filesSelected(){
        self.loading = true;
    }

    function addImages(files) {
        self.loading = false;
        self.currentCount = self.files.length+self.uploadedFilesCount;        
        if(self.currentCount>self.filesLimit){
            $mdToast.show(
                $mdToast.simple()
                .textContent('You can upload maximum of 15 pictures, please remove some to upload more')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
              return;
        }
        angular.forEach(files,function(file,index){
            self.files.push(file);                   
        });    
    }

    function setProgress(event,index){
        self.progressArray[index]=event.progress;                    
        self.progress = self.progressArray.reduceRight(function(a,b){                
            return a+b;
        })/self.files.length;
        
    }
    function updated(event,index){
        // prepare images object
        if(event){
            self.images[index]= event.file;
        }
        
        //count if all the images are well uploaded.
        self.count++;
        if(self.count>=self.files.length){
            self.progressCompleted = true;            
            self.done({
                $event:{
                    images:self.images 
                }
            });
        }

    }
    
}