var serviceSelectorModelController = serviceSelectorModelController;

function serviceSelectorModelController($scope,$rootScope,$reactive,$mdDialog,category,$state,returnUrlService){
    'ngInject';

    ///////////Data/////////////
    var self = this;
    $reactive(self).attach($scope);
    
    self.helpers({
        services: function(){
            if(category){
                return Services.find({
                    $and:[
                        {categoryIds: category._id},
                        {publish:true},
                    ]
                });
            }
            else{
                return Services.find();
            }
        }
    });

    //////////////Method Declaration/////////////////
    self.goToQuestions = goToQuestions;


    /////////////Method Definication///////////////////    
    function goToQuestions(serviceId){
        var returnUrl = {
            stateName: $state.current.name,
            stateParams: $state.params
        };
        returnUrlService.set(returnUrl);
        $mdDialog.hide();
        $state.go('app.serviceQuestions',{serviceId:serviceId});
    }


}