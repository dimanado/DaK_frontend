angular
  .module('Home:Course', [])
  .controller('HomeCourseCtrl', HomeCourseCtrl);

HomeCourseCtrl.$inject = [
  'ENV', '$scope', '$state', 'Course', 'Upload', 'Category', 'Subscription'
];

function HomeCourseCtrl(ENV, $scope, $state, Course, Upload, Category, Subscription) {
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
  vm.checkSender = checkSender;
  vm.resetForm = resetForm;
  vm.deleteCourse = deleteCourse;
  vm.deleteSubscription = deleteSubscription;
  vm.createCourse = createCourse;
  vm.getCourses = getCourses;
  vm.upload = upload;
  vm.mappedData = mappedData;
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
  }

  function upload (course) {
    Upload.upload({
      url: ENV.apiEndpoint + "/courses/",
      data: { 'image': course.photo, 'name': course.name, 'description': course.description,
        'tasks': course.tasks, 'category_ids': course.selectedCat },
      method: 'POST'
    }).then(function (resp) {
      getCourses();
      console.log('Success upload');
      resetForm();
    }, function (resp) {
      console.log('Error status: ' + resp.status);
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

  function deleteCourse(course_id){
    Course.charge({id: course_id}).$promise
      .then(function(data) {
        var elementPos = vm.courses.map(function(x) {return x.id; }).
        indexOf(parseInt(data.id));
        vm.courses.splice(elementPos, 1);
      })
      .catch(function() {
        console.log('course delete error');
      });
  }

  function deleteSubscription(course_id){
    Subscription.charge({id: course_id}).$promise
      .then(function(data) {
        var elementPos = vm.courses.map(function(x) {return x.id; }).
        indexOf(parseInt(data.id));
        vm.courses.splice(elementPos, 1);
      })
      .catch(function() {
        console.log('subscription delete error');
      });
  }

  function checkSender(user_id) {
    if ((user_id) && (JSON.parse(window.localStorage['status']).id == user_id))
      return false;
    else

      return true
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

  function resetForm(){
    var frm = document.getElementsByName('courseForm')[0];
    frm.reset();
    vm.course = null;
  }


  function mappedData(obj) {
    var newArr = [];
    for (var i = 0; i < obj.courses.length; i++) {
      newArr.push(obj.courses[i]);
      if (newArr[newArr.length - 1].categories) {
        newArr[newArr.length - 1].categories = JSON.stringify(newArr[newArr.length - 1].categories);
      }
    }
    return newArr;
  }
}
