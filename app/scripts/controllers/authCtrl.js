angular
  .module('Dak.controllers', [])
  .controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = [
    'ENV', '$scope', '$state', '$auth', '$location',
    'User', '$rootScope'
  ];

  function AuthCtrl (ENV, $scope, $state, $auth, $location,
                     User, $rootScope)
  {
    console.log('AuthCtrl load');
    var vm = this;


    vm.credentials = {};

    vm.signIn = signIn;
    vm.signUp = signUp;

    function signIn() {
      console.log(vm.credentials);
      $auth.submitLogin(vm.credentials)
        .then(function(data) {
          console.log('success load ');
          $state.go('applicationLayout.courses');
          getUserState();


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
          $state.go('applicationLayout.authentication');
          $scope.$parent.$broadcast('reloadUser', {});
        })
        .catch(function(data) {
          console.log('failure ' + data);
        });
    };

    function getUserState(){
      User.get({id: 1 }).$promise
        .then(function(data) {
          var status = {
            name: data.users.email,
            roles: data.users.roles
          };
          window.localStorage['status'] = JSON.stringify(status);
          $rootScope.$broadcast('reloadUser');
        })
        .catch(function() {

        });
    }
  };
