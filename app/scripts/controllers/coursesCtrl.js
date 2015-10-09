angular
  .module('Dak.controllers')
  .controller('CoursesCtrl', CoursesCtrl);

  CoursesCtrl.$inject = [
    'ENV', '$scope', '$state'
  ];

  function CoursesCtrl(ENV, $scope, $state) {
    console.log('CoursesCtrl load');
    var vm = this;
  }
