angular
  .module('Course', [])
  .controller('CoursesCtrl', CoursesCtrl);

  CoursesCtrl.$inject = [
    'ENV', '$scope', '$state', 'Course', 'Category'
  ];

  function CoursesCtrl(ENV, $scope, $state, Course, Category) {
    console.log('CoursesCtrl load');
    var vm = this;
    vm.selectedCat = undefined;
    vm.getCourses = getCourses;
    vm.getCategories = getCategories;
    vm.courses = undefined;
    vm.categories = undefined;
    getCourses();

    function getCourses(){
      Course.get({all: true}).$promise
        .then(function(data) {
          vm.courses = data.courses;
          getCategories();
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
