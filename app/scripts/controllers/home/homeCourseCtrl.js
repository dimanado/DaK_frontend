angular
  .module('Dak.controllers')
  .controller('HomeCourseCtrl', HomeCourseCtrl);

CoursesCtrl.$inject = [
  'ENV', '$scope', '$state', 'Course'
];

function HomeCourseCtrl(ENV, $scope, $state, Course) {
  console.log('HomeCourseCtrl load');
  this.nameCourse = undefined;
  this.visible=false;

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

  function getCourse(){
    console.log('getCourse');
    Course.get();
    return ['mamka','papka','bahir', 'sdasd', 'sadasdasd', 'asdasdasd', '1asdasdasd', '22asdasdasd', '122asdasdasd','1122asdasdasd'];
  }
}
