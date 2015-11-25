angular.module('Dak.directives', [])
  .directive('chat', ['$stateParams', 'WebSocket',

    function($stateParams, WebSocket) {
      'use strict';

      return {
        restrict: 'AE',
        templateUrl: '../views/chat.html',
        controller: function($rootScope, $scope) {

          $scope.messages = [];
          $scope.submitMessage = submitMessage;

          connect();
          function connect() {
            WebSocket.setCallback(callback);
            WebSocket.start();
          };

          $rootScope.$on('$stateChangeStart', function(event) {
            WebSocket.disconnect();
          });


          function callback(data) {
            $scope.messages.push(data);
          } 

          function submitMessage(data) {
            var message = {
              channel: $stateParams.id.toString(),
              text: data.text,
            };
            WebSocket.trigger('message.create', message);
            $scope.message.text = '';
          }
        }
      }
    }
  ])