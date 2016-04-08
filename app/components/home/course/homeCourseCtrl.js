angular
  .module('Home:Course', [])
  .controller('HomeCourseCtrl', HomeCourseCtrl);

HomeCourseCtrl.$inject = [
  'ENV', '$scope', '$state', 'Course', 'Upload', 'Category'
];

function HomeCourseCtrl(ENV, $scope, $state, Course, Upload, Category) {
  console.log('HomeCourseCtrl load');
  var vm = this;
  vm.nameCourse = undefined;
  vm.visible = false;
  vm.courses = undefined;
  vm.categories = undefined;
  vm.selectedCat = undefined;
  vm.course = undefined;

  vm.getCategories = getCategories;
  vm.changeVisible = changeVisible;
  vm.createCourse = createCourse;
  vm.getCourses = getCourses;
  vm.upload = upload;
  getCourses();


  function changeVisible() {
    console.log('changeVisible');
    vm.visible = !vm.visible;
    getCategories();
  }

  function createCourse() {

    if (vm.course.photo && !vm.course.photo.$error) {
      vm.upload(vm.course);
    }
  };

  function upload (course) {
    Upload.upload({
      url: ENV.apiEndpoint + "/courses/",
      data: { 'image': course.photo, 'name': course.name, 'description': course.description,
        'tasks': course.tasks, 'category_ids': course.selectedCat },
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

  function getCategories(){
    Category.get().$promise
      .then(function(data) {
        vm.categories = data.categories;
      })
      .catch(function() {
        console.log('categories load error');
      });
  }
}
