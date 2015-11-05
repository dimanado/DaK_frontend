angular
  .module('Dak.controllers')
  .controller('homeVideoCtrl', homeVideoCtrl);

homeVideoCtrl.$inject = [
  'ENV', '$scope', '$state', '$stateParams', 'Upload', 'Video', 'Subscription'
];

function homeVideoCtrl(ENV, $scope, $state, $stateParams, Upload, Video, Subscription) {
  console.log('homeVideoCtrl load');

  var vm = this;

  vm.file = undefined;
  vm.name = undefined;
  vm.videos = undefined;
  vm.visible = false;
  vm.isSubscribe = undefined;

  vm.submit = submit;
  vm.upload = upload;
  vm.getVideos = getVideos;
  vm.changeVisible = changeVisible;
  vm.subscribeCourse = subscribeCourse;
  vm.subscriptionStatus = subscriptionStatus;

  getVideos();
  subscriptionStatus();

  function changeVisible() {
    console.log('changeVisible');
    vm.visible= vm.visible ? false : true ;
  }

  function getVideos() {
    Video.get({id_course:  $stateParams.id}).$promise
      .then(function(data) {
        vm.videos = data.video;
      })
      .catch(function() {
        console.log('courses load error');
      });
  }

  function submit() {
    if ( vm.file && !vm.file.$error) {
      vm.upload(vm.file);
    }
  };

  function upload (file) {
    Upload.upload({
      url: ENV.apiEndpoint + "/video/",
      data: {file: file, 'id_course': $stateParams.id, 'name': vm.name},
      method: 'POST'
    }).then(function (resp) {
      vm.getVideos();
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      file.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + file.progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  function subscribeCourse() {
    Subscription.save({id:  $stateParams.id, str: 'add_course'}).$promise
      .then(function(data) {
        subscriptionStatus();
      })
      .catch(function() {
      });
  }

  function subscriptionStatus() {
    Subscription.get({id:  $stateParams.id, str: 'check_status'}).$promise
      .then(function(data) {
        vm.isSubscribe = true;
      })
      .catch(function() {
        vm.isSubscribe = false;
      });
  }

}

