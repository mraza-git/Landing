var serviceSelectorModelController = serviceSelectorModelController;

function serviceSelectorModelController($scope,$reactive,$mdDialog,category,$state){
    'ngInject';

    ///////////Data/////////////
    var self = this;
    $reactive(self).attach($scope);
    
    self.helpers({
        services: function(){
            return Services.find({
                categoryIds: category._id
            });
        }
    });

    //////////////Method Declaration/////////////////
    self.goToQuestions = goToQuestions;


    /////////////Method Definication///////////////////
    function goToQuestions(serviceId){
        $state.go('app.serviceQuestions',{serviceId:serviceId});
        $mdDialog.hide();
    }


}