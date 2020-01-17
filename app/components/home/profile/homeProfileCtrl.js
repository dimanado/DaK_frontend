angular
  .module('Home:Profile', [])
  .controller('homeProfileCtrl', homeProfileCtrl);

homeProfileCtrl.$inject = [
  'ENV', '$scope', '$state', '$stateParams', 'User'
];

function homeProfileCtrl(ENV, $scope, $state, $stateParams, User) {
  var vm = this;

  vm.user = undefined;

  vm.getUserInfo = getUserInfo;
  vm.updateProfile= updateProfile;

  getUserInfo();

  function getUserInfo() {
    User.get({ id:  JSON.parse(window.localStorage['status'] || '{}').id }).$promise
      .then(function(data) {
        vm.user = data.users;
      })
      .catch(function() {
        console.log('user load error');
      });
  }

  function updateProfile() {
    debugger
    User.charge({ id:  JSON.parse(window.localStorage['status'] || '{}').id, email: vm.user.email,
              nickname: vm.user.nickname }).$promise
      .then(function(data) {
        vm.user = data.users;
      })
      .catch(function() {
        console.log('user update error');
      });
  }
}

