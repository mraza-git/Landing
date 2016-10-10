var serviceSelectorModelController = serviceSelectorModelController;

function serviceSelectorModelController($scope,$reactive,$mdDialog,category){
    'ngInject';

    var self = this;
    $reactive(self).attach($scope);
    
    self.helpers({
        services: function(){
            return Services.find({
                categoryIds: category._id
            });
        }
    });





}