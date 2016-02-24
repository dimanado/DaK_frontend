angular
  .module('Course', [])
  .controller('CoursesCtrl', CoursesCtrl);

  CoursesCtrl.$inject = [
    'ENV', '$scope', '$state', 'Course'
  ];

  function CoursesCtrl(ENV, $scope, $state, Course) {
    console.log('CoursesCtrl load');
    var vm = this;
    vm.getCourses = getCourses;
    vm.courses = undefined;
    getCourses();

    function getCourses(){
      Course.get({all: true}).$promise
        .then(function(data) {
          vm.courses = data.courses;
        })
        .catch(function() {
          console.log('courses load error');
        });
    }

  }
