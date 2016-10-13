var CreatePageDialogController = CreatePageDialogController;

function CreatePageDialogController($mdDialog, selectedPage,pages,index) {
  var vm = this;

  // Data
  vm.page = {};
  // if Edit
  if (angular.isDefined(selectedPage)) {
    vm.page = angular.copy(selectedPage);
    vm.edit = true;
  }else{
    vm.page.title = 'Page ' + (index+1).toString();
  }

  if(angular.isDefined(pages)){
    vm.pages = angular.copy(pages);
  }else{
    vm.pages = [];
    vm.page.title = "Page 0";
  }


  // Methods
  vm.closeDialog = closeDialog;
  vm.save = save;
  vm.remove = remove;

  //////////

  function save() {
    if (vm.edit) {
      var newArray = pages.map(function(item){
        return item === selectedPage ? vm.page: item;
      });
      vm.pages = newArray;
      vm.closeDialog(vm.pages,vm.page);
    } else {
      // insert at index
      vm.page.questions = [];
      vm.pages.insert(vm.page,index+1);
      vm.closeDialog(vm.pages,vm.page)
    }
  }

  function remove() {
    if(vm.edit){
      pages.splice(pages.indexOf(selectedPage),1);
    }
  }

  function closeDialog(pages,page) {
    $mdDialog.hide(pages,page);
  }
}
