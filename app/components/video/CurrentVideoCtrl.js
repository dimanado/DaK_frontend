angular
  .module('Video')
  .controller('CurrentVideoCtrl', CurrentVideoCtrl);

CurrentVideoCtrl.$inject = [
  'ENV', '$scope', '$state', 'Video', '$stateParams', '$sce', 'Vote'
];

function CurrentVideoCtrl(ENV, $scope, $state, Video, $stateParams, $sce, Vote) {
  console.log('CurrentVideoCtrl load');
  var vm = this;
  vm.video = undefined;
  vm.config = undefined;

  vm.vote = vote;
  vm.checkVoter = checkVoter;
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

  function vote(vote_type) {
    var status = JSON.parse(window.localStorage['status'] || '{}');

    Vote.charge({id: $stateParams.id, user_email: status.name, vote_type: vote_type, item_type: 'video'}).$promise
      .then(function(data) {
        vm.video = data.vote_video;
      })
      .catch(function() {
        console.log('courses load error');
      });
  }

  function checkVoter(author_id) {
    if (JSON.parse(window.localStorage['status']).id == author_id)
      return true;
    else
      return false
  }
}

