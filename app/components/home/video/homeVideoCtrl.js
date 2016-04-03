angular
  .module('Home:Video', [])
  .controller('homeVideoCtrl', homeVideoCtrl);

homeVideoCtrl.$inject = [
  'ENV', '$scope', '$state', '$stateParams', 'Upload',
  'Video', 'Subscription', 'Task'
];

function homeVideoCtrl(ENV, $scope, $state, $stateParams, Upload,
                       Video, Subscription) {
  var vm = this;

  vm.video = undefined;
  vm.videos = undefined;
  vm.visible = false;
  vm.isSubscribe = undefined;
  vm.meta = undefined;

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
    vm.visible = !vm.visible;
  }

  function getVideos() {
    Video.get({ id_course:  $stateParams.id }).$promise
      .then(function(data) {
        vm.videos = data.video;
        vm.meta = data.meta;
      })
      .catch(function() {
        console.log('courses load error');
      });
  }

  function submit() {
    if (vm.video.file && !vm.video.file.$error) {
      vm.upload(vm.video);
    }
  };

  function upload (video) {
    Upload.upload({
      url: ENV.apiEndpoint + "/video/",
      data: { 'file': video.file, 'id_course': $stateParams.id,
              'name': video.name,'description': video.description,
              'image': video.photo },
      method: 'POST'
    }).then(function (resp) {
      vm.getVideos();
      console.log('Success ' + resp.config.data.file.name +
      'uploaded. Response: ' + resp.data);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      video.file.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + video.file.progressPercentage + '% '
      + evt.config.data.file.name);
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
        if(data.success === true)
          vm.isSubscribe = true;
        else
          vm.isSubscribe = false;
      })
      .catch(function() {
        vm.isSubscribe = false;
      });
  }
}

