angular
  .module('Dak.controllers')
  .controller('HomeCourseCtrl', HomeCourseCtrl);

HomeCourseCtrl.$inject = [
  'ENV', '$scope', '$state', 'Course', 'Upload'
];

function HomeCourseCtrl(ENV, $scope, $state, Course, Upload) {
  console.log('HomeCourseCtrl load');
  var vm = this;
  vm.nameCourse = undefined;
  vm.visible = false;
  vm.courses = undefined;
  vm.course = undefined;

  vm.changeVisible = changeVisible;
  vm.createCourse = createCourse;
  vm.getCourses = getCourses;
  vm.upload = upload;
  getCourses();

  function changeVisible() {
    console.log('changeVisible');
    vm.visible = !vm.visible;
  }

  //function createCourse() {
  //  console.log('createCourse');
  //  Course.save({name: vm.nameCourse}).$promise
  //    .then(function(data) {
  //      console.log('success');
  //      getCourses();
  //    })
  //    .catch(function(data) {
  //      console.log('failure ' + data);
  //    });
  //}

  function createCourse() {

    if (vm.course.photo && !vm.course.photo.$error) {
      vm.upload(vm.course);
    }
  };

  function upload (course) {
    Upload.upload({
      url: ENV.apiEndpoint + "/courses/",
      data: { 'image': course.photo, 'name': course.name },
      method: 'POST'
    }).then(function (resp) {
      getCourses();
      console.log('Success upload');
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    });
  };

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
