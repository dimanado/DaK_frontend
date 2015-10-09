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

  function isLoggedIn(){
    return (localStorage.getItem('auth_headers')) ? true : false;
  };

  function isLoggedOut(name){
    if($state.current.name != 'layout.' + name)
      return (!localStorage.getItem('auth_headers')) ? true : false;
    else
      return false;
  };

  function signOutCl(){
    $auth.signOut()
      .then(function(resp) {
        console.log('success');
        $state.go('applicationLayout.courses');
      })
      .catch(function(resp) {
        console.log('error');
      });
  };


}
