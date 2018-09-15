angular
  .module('Home:Conversation')
  .factory('Message', ['$resource', 'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/messages/:id",
      {
        id: '@id'
      });
  }]);

