angular
  .module('Home:Conversation', [])
  .controller('homeConversationCtrl', homeConversationCtrl);

homeConversationCtrl.$inject = [
  'ENV', '$scope', '$state', '$stateParams',
  'Message', 'User'
];

function homeConversationCtrl(ENV, $scope, $state, $stateParams, Message, User) {
  console.log('HomeConversationCtrl load');
  var vm = this;

  vm.users = undefined;

  vm.redirect = redirect;
  vm.getUsers = getUsers;
  getUsers();
  debugger;

  function getUsers() {
    User.get({all: true}).$promise
      .then(function(data) {
        vm.users = data.user;
      })
      .catch(function() {
        console.log('users load error');
      });
  }

  function redirect(){
    vm.redirect = function(){
      $state.go('applicationLayout.homeLayout.newMessage');
    }
  }

}
