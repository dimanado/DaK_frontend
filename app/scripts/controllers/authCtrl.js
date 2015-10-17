angular
  .module('Dak.controllers', [])
  .controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = [
    'ENV', '$scope', '$state', '$auth', '$location'
  ];

  function AuthCtrl (ENV, $scope, $state, $auth, $location) {
    console.log('AuthCtrl load');
    var vm = this;

    vm.credentials = {};

    vm.signIn = signIn;
    vm.signUp = signUp;

    function signIn() {
      console.log(vm.credentials);
      $auth.submitLogin(vm.credentials)
        .then(function(data) {
          console.log('success');
          $state.go('applicationLayout.courses');
        })
        .catch(function(data) {
          console.log('failure ' + data);
        });
    };

    function signUp() {
      console.log(vm.credentials);
      $auth.submitRegistration(vm.credentials)
        .then(function(data) {
          console.log('success');
          $state.go('authentication');
        })
        .catch(function(data) {
          console.log('failure ' + data);
        });
    };
  };
