angular
  .module('Home:Course')
  .factory('Vote', ['$resource' ,'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/video/:id/vote",
      {
        id: '@id'
      },{
        charge: {method:'PUT', params:{id: '@id'}}
      });
  }]);


