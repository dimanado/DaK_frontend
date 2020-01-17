angular
  .module('Auth')
  .factory('User', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/users/:id/:str",
      {
        str: '@str'
      },{
        charge: {method:'PATCH', params:{id: '@id'}}
      });
  }]);
