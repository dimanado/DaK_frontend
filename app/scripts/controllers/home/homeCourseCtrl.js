angular
  .module('Dak.controllers')
  .controller('HomeCourseCtrl', HomeCourseCtrl);

CoursesCtrl.$inject = [
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
    vm.visible= vm.visible ? false : true ;
  }

  function createCourse() {
    console.log('createCourse');
    debugger;
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
    //if( vm.courses == undefined){
    //  vm.courses = Course.get();
    //}
    Course.get().$promise
      .then(function(data) {
        vm.courses = data.courses;
      })
      .catch(function() {
        console.log('courses load error');
      });
  }
}
