angular
  .module('Video')
  .controller('CurrentVideoCtrl', CurrentVideoCtrl);

CurrentVideoCtrl.$inject = [
  'ENV', '$scope', '$state', 'Video', '$stateParams', '$sce'
];

function CurrentVideoCtrl(ENV, $scope, $state, Video, $stateParams, $sce) {
  console.log('CurrentVideoCtrl load');
  var vm = this;

  vm.video = undefined;
  vm.config = undefined;

  getVideo();

  function getVideo() {
    Video.get({id:  $stateParams.id}).$promise
      .then(function(data) {
        vm.video = data.video;
        vm.config = {
          sources: [ {
            src: $sce.trustAsResourceUrl(data.video.url),
            type: data.video.format
          } ]
        };
      })
      .catch(function() {
        console.log('courses load error');
      });
  }
}
