angular
  .module('Dak.controllers')
  .controller('HomeCourseCtrl', HomeCourseCtrl);

CoursesCtrl.$inject = [
  'ENV', '$scope', '$state', 'Course'
];

function HomeCourseCtrl(ENV, $scope, $state, Course) {
  console.log('HomeCourseCtrl load');
  this.nameCourse = undefined;
  this.visible = false;
  this.courses = undefined;

  this.changeVisible = changeVisible;
  this.createCourse = createCourse;
  this.getCourse = getCourse;

  function changeVisible(){
    console.log('changeVisible');
    this.visible= this.visible ? false : true ;
  }

  function createCourse(){
    console.log('createCourse');
    Course.save({name:this.nameCourse});
  }

  function currentCourses(){
    if( this.courses == undefined){
      this.courses = Course.get();
    }
    return  this.courses;
  }

  function getCourse(){
    console.log('getCourse');
    var courses=currentCourses();
    //Course.get();
    return courses.courses;
  }
}
