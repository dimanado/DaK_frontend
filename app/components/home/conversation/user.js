angular
  .module('User')
  .factory('User', ['$resource', 'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/users/:id",
      {
        id: '@id'
      },{
        charge: {method:'DELETE', params:{id: '@id'}}
      });
  }]);
