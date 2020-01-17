angular
  .module('Comment', [])
  .factory('Comment', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/comments/:id",
      {
      });
  }])
  .directive('comment', function(Comment,$stateParams,User) {
    return {
      restrict: 'E',
      scope: {
        video: '='
      },
      templateUrl: 'components/comment/comments.html',
      link: function (scope, element, attrs) {
          scope.root_comment_id = undefined;
          scope.addComment = addComment;
          scope.deleteComment = deleteComment;
          scope.checkSender = checkSender;
          scope.getReplierIdAndNickname = getReplierIdAndNickname;
          scope.getId = getId;

          function addComment(txt_comment,item_id) {
            if (txt_comment.match(/([^,]*),(.*)/)) {
              txt_comment = txt_comment.match(/([^,]*),(.*)/)[2]
            }
            var user_id = JSON.parse(window.localStorage['status']).id;
            Comment.save({body: txt_comment, sender_id: user_id,
              root_comment_id: scope.root_comment_id, item_id: item_id, type: 'video'}).$promise
              .then(function(data) {
                scope.video.video.comments.unshift(data.comment);
                scope.txtcomment = undefined;
              })
              .catch(function() {
              });
          }

          function deleteComment(comment_id) {
            Comment.delete({id: comment_id}).$promise
              .then(function(data) {
                var elementPos = scope.video.video.comments.map(function(x) {return x.id; }).
                indexOf(data.comment.id);
                scope.video.video.comments.splice(elementPos, 1);
              })
              .catch(function() {
              });
          }

          function checkSender(sender_comment_id) {
            if (JSON.parse(window.localStorage['status']).id == sender_comment_id)
              return false;
            else
              return true
          }

          function getReplierIdAndNickname(comment_id,nickname,sender_id){
            if (scope.checkSender(sender_id)) {
              scope.root_comment_id = comment_id;
              scope.txtcomment = nickname + ",";
            }
            else
              scope.txtcomment = undefined;
          }

          function getId(name) {
              User.save({nickname: name, str: 'get_id'}).$promise
                .then(function (data) {
                  return data.id
                })
                .catch(function () {
                });
          }
      }
    };
  });
