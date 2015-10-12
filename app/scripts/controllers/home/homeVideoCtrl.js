angular
  .module('Dak.controllers')
  .controller('homeVideoCtrl', homeVideoCtrl);

CoursesCtrl.$inject = [
  'ENV', '$scope', '$state', '$stateParams', 'Upload', 'Video'
];

function homeVideoCtrl(ENV, $scope, $state, $stateParams, Upload, Video) {
  console.log('homeVideoCtrl load');

  var vm = this;

  vm.file = undefined;
  vm.name = undefined;
  vm.videos = undefined;

  vm.submit = submit;
  vm.upload = upload;
  vm.getVideos = getVideos;


  getVideos();

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

}

