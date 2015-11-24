angular.module('Bookt.services')
  .factory('WebSocket', ['$stateParams'
    function($stateParams) {
      var socket, channels = {};

      return {
        start: start,
        disconnect: disconnect,
        trigger: trigger
      };

      function chatChannel() {
        return 'chatChannel_' + $stateParams.id.toString();
      }

      function openWebSocket() {
        console.log('opening websocket');
        socket = new WebSocketRails('localhost:3000/websocket');
      }


      function get() {
        if (!socket) {
          openWebSocket();
        }
        return socket;
      }

   
      function resolveMessage(message) {
        
      }

    
      function getChannel(channelName) {
        get();
        if (!channels[channelName] && socket) {
          console.log('connecting to channel ' + channelName);
          channels[channelName] = socket.subscribe(channelName);
        }
        return channels[channelName];
      }

      function bindTo(channelName, eventName, bindCallback) {
        var channel = getChannel(channelName);
        channel.unbind(eventName);
        channel.bind(eventName, bindCallback);
      }

      function subscribe(channel_name, success_callback, failure_callback) {
        get().subscribe(channel_name, success_callback, failure_callback);
      }

      function unsubscribe(channel_name) {
        get().unsubscribe(channel_name);
      }


      function start() {
        openWebSocket();
        bindTo(chatChannel(), 'create', resolveMessage())
      }

      function disconnect() {
        unsubscribe(chatChannel());
        socket = null;
        channels = {};
      }

      function trigger(event_name, data, success_callback, failure_callback) {
        get().trigger(event_name, data, success_callback, failure_callback);
      }

    }]
  );