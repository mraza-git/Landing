var CreateEditDialogController = CreateEditDialogController;

function CreateEditDialogController($mdDialog, selectedForm, $scope, $reactive) {
  var vm = this;

  // Data
  vm.form = {};
  $reactive(vm).attach($scope);
  vm.helpers({
    services: function() {
      return Services.find();
    }
  });

  // if Edit
  if (angular.isDefined(selectedForm)) {
    vm.form = selectedForm;
    vm.edit = true;
  }

  // Methods
  vm.closeDialog = closeDialog;
  vm.save = save;
  vm.remove = remove;

  //////////

  function save() {
    if (vm.edit) {
      var id = vm.form._id;
      delete vm.form._id;
      var form = angular.copy(vm.form);
      FocForms.update({
        _id:id
      }, {
        $set: form,
      });
      vm.form._id = id;
      vm.closeDialog(vm.form);
    } else {
      vm.form.createdAt = new Date();
      vm.form.deleted = false;
      vm.form.folder ="draft";
      vm.form.owner = Meteor.userId();
      FocForms.insert(vm.form,function(err,doc){
        if(err) return;
        vm.form._id = doc;
        vm.closeDialog(vm.form);
      });

    }
  }

  function remove() {
    //Show alert.
    FocForms.remove(vm.form._id,function(err,doc){
      vm.closeDialog(doc);
    });
    //show toast.
  }

  function closeDialog(form) {
    $mdDialog.hide(form);
  }
}
