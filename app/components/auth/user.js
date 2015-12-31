angular
  .module('Auth')
  .factory('User', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/users/:id",
      {
        id: '@id'
      },{
        charge: {method:'PATCH', params:{id: '@id'}}
      });
  }]);
