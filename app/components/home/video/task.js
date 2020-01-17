angular
  .module('Home:Video')
  .factory('Task', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/tasks/:id/",
      {

      },{
        charge: {method:'DELETE', params:{id: '@id'}}
      });
  }])
  .directive('task', function(Task, Upload, ENV) {
    return {
      restrict: 'E',
      scope: {
        video: '='
      },
      templateUrl: 'components/home/video/tasks.html',
      link: function (scope, element, attrs) {
        scope.visible = false;

        scope.checkSender = checkSender;
        scope.deleteTask = deleteTask;
        scope.upload = upload;
        scope.changeVisible = changeVisible;

        function deleteTask(task_id) {
          Task.charge({id: task_id}).$promise
            .then(function(data) {
              var elementPos = scope.video.meta.tasks.map(function(x) {return x.id; }).
              indexOf(parseInt(data.id));
              scope.video.meta.tasks.splice(elementPos, 1);
            })
            .catch(function() {
              console.log('task delete error');
            });
        }

        function checkSender(sender_comment_id) {
          if ((sender_comment_id) && (JSON.parse(window.localStorage['status']).id == sender_comment_id))
            return false;
          else
            return true
        }

        function upload (tasks, course_id) {
          Upload.upload({
            url: ENV.apiEndpoint + "/tasks/",
            data: { 'tasks': tasks, id: course_id },
            method: 'POST'
          }).then(function (resp) {
              scope.video.meta.tasks = resp.data.tasks;
              scope.visible = false;
          }, function (resp) {
            console.log('Error status: ' + resp.status);
          });
        };

        function changeVisible() {
          scope.visible = !scope.visible;
        }
      }
    };
  });


