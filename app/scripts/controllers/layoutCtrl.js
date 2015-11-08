angular
  .module('Dak.controllers')
  .controller('LayoutCtrl', LayoutCtrl);

LayoutCtrl.$inject = [
  'ENV', '$scope', '$state', '$auth'
];

function LayoutCtrl(ENV, $scope, $state, $auth) {
  console.log('LayoutCtrl load');
  var vm = this;

  vm.isLoggedIn=isLoggedIn;
  vm.isLoggedOut=isLoggedOut;
  vm.signOutCl = signOutCl;
  vm.userName = userName;
  vm.checkRole = checkRole;

  vm.userIsValid = undefined;
  vm.userNameStr = undefined;
  vm.userRoleMas = undefined;


  $scope.$on('reloadUser', function (event, data) {
    validateUser();
    userName();
  });

  validateUser();
  userName();

  function isLoggedIn(){
    return vm.userIsValid;
  };

  function isLoggedOut(name){

    if($state.current.name != 'layout.' + name) {
      return !vm.userIsValid;
    }
    else
      return false;
  };

  function validateUser(){
    $auth.validateUser()
      .then(function(resp) {
        vm.userIsValid = true
      })
      .catch(function(resp) {
        vm.userIsValid = false
      });
  }

  function signOutCl(){
    $auth.signOut()
      .then(function(resp) {
        console.log('success');
        $state.go('applicationLayout.courses');
        window.localStorage.removeItem('status')
        validateUser();
        userName();
      })
      .catch(function(resp) {
        console.log('error');
      });
  };

  function userName(){
    var status = JSON.parse(window.localStorage['status'] || '{}');
    if(status != null) {
      vm.userNameStr = status.name;
      vm.userRoleMas = status.roles;
    }
    else
      vm.userNameStr = null;
  };

  function checkRole(checkStr){
    //return vm.userRoleMas == checkStr;
    var returnBool = false;
    vm.userRoleMas.forEach(function(item) {
      if(checkStr === item.name)
        returnBool = true;
    });
    return returnBool
  }


}
