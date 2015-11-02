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

  vm.userIsValid = undefined;
  vm.userNameStr = undefined;
  vm.userRoleStr = undefined;

  $scope.$on('reloadUser', function (event, data) {
    validateUser();
    userName();
  });

  validateUser();
  userName();

  function isLoggedIn(){
    return userIsValid;
  };

  function isLoggedOut(name){

    if($state.current.name != 'layout.' + name) {
      return !userIsValid;
    }
    else
      return false;
  };

  function validateUser(){
    $auth.validateUser()
      .then(function(resp) {
        userIsValid = true
      })
      .catch(function(resp) {
        userIsValid = false
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
      vm.userRoleStr = status.role;
    }
    else
      vm.userNameStr = null;
  };


}
