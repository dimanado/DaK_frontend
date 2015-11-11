angular
  .module('Dak.controllers')
  .controller('HomeCourseCtrl', HomeCourseCtrl);

HomeCourseCtrl.$inject = [
  'ENV', '$scope', '$state', 'Course'
];

function HomeCourseCtrl(ENV, $scope, $state, Course) {
  console.log('HomeCourseCtrl load');
  var vm = this;
  vm.nameCourse = undefined;
  vm.visible = false;
  vm.courses = undefined;

  vm.changeVisible = changeVisible;
  vm.createCourse = createCourse;
  vm.getCourses = getCourses;
  getCourses();

  function changeVisible() {
    console.log('changeVisible');
    vm.visible = !vm.visible;
  }

  function createCourse() {
    console.log('createCourse');
    Course.save({name: vm.nameCourse}).$promise
      .then(function(data) {
        console.log('success');
        getCourses();
      })
      .catch(function(data) {
        console.log('failure ' + data);
      });
  }

  function getCourses(){
    Course.get().$promise
      .then(function(data) {
        vm.courses = data.courses;
      })
      .catch(function() {
        console.log('courses load error');
      });
  }
}
