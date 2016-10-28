var QuoteDialogController  = QuoteDialogController ;

function QuoteDialogController ($mdDialog, currentProject, $scope, $reactive,$mdToast) {
  var vm = this;

  // Data
  vm.project = {};
  $reactive(vm).attach($scope);
  vm.loading = true;
  // Methods
  vm.closeDialog = closeDialog;
  vm.save = save;
  vm.remove = remove;
    

  vm.subscribe('quoteByLeadId',function(){
    return[
      [currentProject._id]
    ]
  },function(){
    vm.loading = false;    
  });  
  
  vm.helpers({
    quote: function(){
      var quote = Quotes.findOne({
        leadId:currentProject._id,
        owner: Meteor.userId()
      });
      if(quote){
        vm.quote = quote;
        vm.edit = true;
      }
      return vm.quote;
    }
  });

  // if Edit
  if (angular.isDefined(currentProject)) {
    vm.project = angular.copy(currentProject);    
  }


  //////////

  function save() {
    if (vm.edit) {
      vm.quote.updatedAt = new Date();
      var id = vm.quote._id;
      var quote = angular.copy(vm.quote);            
      delete quote._id;
      Quotes.update(
        {
          _id:id
        }, 
        {
          $set: quote,            
        },
        function(){
          $mdToast.show(
                $mdToast.simple()
                .textContent('Record updated.')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
            vm.closeDialog(vm.quote);
        }
      )
      vm.closeDialog(vm.quote);
    } else {
      vm.quote.createdAt = new Date();      
      vm.quote.deleted = false;      
      vm.quote.owner = Meteor.userId();
      vm.quote.leadId = vm.project._id;
      Quotes.insert(vm.quote,function(err,doc){
        if(err) {
          console.log(err);
          return;
        }
        vm.quote._id = doc;        
        console.log('function called');
        Leads.update(
          {_id: currentProject._id,},
          {
            $push: 
            {
              quotes: doc, // push the id of currently insert quote into the lead document.
              quotedBy: vm.quote.owner
            }
          },
          function(err,doc){
            $mdToast.show(
                $mdToast.simple()
                .textContent('Record saved.')               
                .position('top right')
                .action('x')
                .hideDelay(5000)
              );
            vm.closeDialog(vm.quote);
          }
        );

      });

    }
  }

  function remove() {
    //Show alert.
    Quotes.remove(vm.quote._id,function(err,doc){
      vm.closeDialog();
    });
    //show toast.
  }

  function closeDialog(project) {
    $mdDialog.hide(project);
  }
}
