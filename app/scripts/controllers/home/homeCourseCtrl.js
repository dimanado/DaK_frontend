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
  vm.getCourse = getCourse;

  function changeVisible(){
    console.log('changeVisible');
    vm.visible= vm.visible ? false : true ;
  }

  function createCourse(){
    console.log('createCourse');
    Course.save({name:vm.nameCourse});
  }

  function currentCourses(){
    if( vm.courses == undefined){
      vm.courses = Course.get();
    }
    return  vm.courses;
  }

  function getCourse(){
    console.log('getCourse');
    var courses=currentCourses();
    //Course.get();
    return courses.courses;
  }
}
