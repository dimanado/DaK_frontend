angular
  .module('Dak.controllers')
  .controller('CoursesCtrl', CoursesCtrl);

  CoursesCtrl.$inject = [
    'ENV', '$scope', '$state', 'Course'
  ];

  function CoursesCtrl(ENV, $scope, $state, Course) {
    console.log('CoursesCtrl load');
    var vm = this;
    Course.get();
  }
