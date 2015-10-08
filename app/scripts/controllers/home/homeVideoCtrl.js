angular
  .module('Dak.controllers')
  .controller('homeVideoCtrl', homeVideoCtrl);

CoursesCtrl.$inject = [
  'ENV', '$scope', '$state', '$stateParams','Upload'
];

function homeVideoCtrl(ENV, $scope, $state, $stateParams, Upload) {
  console.log('homeVideoCtrl load');
  this.submit = function() {
    if ( this.file && !this.file.$error) {
      this.upload(this.file);
    }
  };

  this.upload = function (file) {
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
  //this.uploadPic=uploadPic;
  //
  //function uploadPic (file) {
  //  file.upload = Upload.upload({
  //    url: '/1455',
  //    data: {file: file}
  //  });
  //
  //  file.upload.then(function (response) {
  //    console.log('upload success');
  //  }, function (response) {
  //    console.log('upload error');
  //  }, function (evt) {
  //    // Math.min is to fix IE which reports 200% sometimes
  //    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  //  });
  //}

}

