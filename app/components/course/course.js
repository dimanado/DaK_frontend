angular
  .module('Course')
  .factory('Course', ['$resource', 'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/courses/:id",
      {
        id: '@id'
      });
  }])
