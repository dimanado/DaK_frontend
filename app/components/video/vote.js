angular
  .module('Video')
  .factory('Vote', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/users/vote",
      {
        id: '@id'
      },{
        charge: {method:'PUT', params:{id: '@id'}}
      });
  }])
  .directive('vote', function(Vote) {
    return {
      restrict: 'E',
      scope: {
        video: '='
      },
      templateUrl: 'components/video/vote.html',
      link: function (scope, element, attrs) {
        scope.vote = vote;
        scope.checkSender = checkSender;

        function vote(vote_type) {
          var status = JSON.parse(window.localStorage['status'] || '{}');
          Vote.charge({id: $stateParams.id, user_email: status.name, vote_type: vote_type, item_type: 'video'}).$promise
            .then(function(data) {
              scope.video = data.vote_video;
            })
            .catch(function() {
              console.log('courses load error');
            });
        }

        function checkSender(sender_comment_id) {
          if (JSON.parse(window.localStorage['status']).id == sender_comment_id)
            return false;
          else
            return true
        }
      }
    };
  });


