angular
  .module('Dak.controllers')
  .controller('homeCurrentVideoCtrl', homeCurrentVideoCtrl);

homeCurrentVideoCtrl.$inject = [
  'ENV', '$scope', '$state', 'Video', '$stateParams', '$sce'
];

function homeCurrentVideoCtrl(ENV, $scope, $state, Video, $stateParams, $sce) {
  console.log('homeCurrentVideoCtrl load');
  var vm = this;

  vm.video = undefined;
  vm.config = undefined;

  getVideo();

  function getVideo() {
    Video.get({id:  $stateParams.id}).$promise
      .then(function(data) {
        vm.video = data.video;
        vm.config = {sources: [{src: $sce.trustAsResourceUrl(ENV.apiEndpoint+data.video.url), type: data.video.format}]};
      })
      .catch(function() {
        console.log('courses load error');
      });
  }
}
