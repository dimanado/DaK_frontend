angular
  .module('Dak.controllers')
  .controller('homeVideoCtrl', homeVideoCtrl);

CoursesCtrl.$inject = [
  'ENV', '$scope', '$state', '$stateParams', 'Upload', '$sce'
];

function homeVideoCtrl(ENV, $scope, $state, $stateParams, Upload, $sce) {
  console.log('homeVideoCtrl load');

  var vm = this;

  vm.file = undefined;

  vm.submit = submit;
  vm.upload = upload;

  function submit() {
    if ( vm.file && !vm.file.$error) {
      vm.upload(vm.file);
    }
  };

  function upload (file) {
    Upload.upload({
      url: ENV.apiEndpoint + "/video/",
      data: {file: file, 'id_course': $stateParams.id},
      method: 'POST'
    }).then(function (resp) {
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      file.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + file.progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  this.config = {
    sources: [
      //{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
      //{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
      {src: $sce.trustAsResourceUrl("http://localhost:3000/uploads/RackMultipart20151012-30031-7t5tth.mp4"), type: "video/ogg"}
      //{src: $sce.trustAsResourceUrl("/uploads/VID_20150803_091318.mp4"), type: "video/mp4"}
    ],
    tracks: [
      {
        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
        kind: "subtitles",
        srclang: "en",
        label: "English",
        default: ""
      }
    ],
    theme: "bower_components/videogular-themes-default/videogular.css",
    plugins: {
      poster: "http://www.videogular.com/assets/images/videogular.png"
    }
  };

}

