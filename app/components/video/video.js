angular
  .module('Video', [])
  .factory('Video', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/video/:id",
      {
        id: '@id'
      },{
        charge: {method:'DELETE', params:{id: '@id'}}
      });
  }]);
