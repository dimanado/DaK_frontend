angular
  .module('Dak.services')
  .factory('Video', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/video/:id",
      {
        id: '@id'
      });
  }]);
