angular
  .module('Dak.controllers')
  .controller('HomeCourseCtrl', HomeCourseCtrl);

CoursesCtrl.$inject = [
  'ENV', '$scope', '$state'
];

function HomeCourseCtrl(ENV, $scope, $state) {
  console.log('HomeCourseCtrl load');

  this.visible=false;

  this.changeVisible = changeVisible;


  function changeVisible(){
    console.log('changeVisible');
    debugger;
    this.visible= this.visible ? false : true ;
  }
}
