angular
  .module('Home:Course')
  .factory('Category', ['$resource', 'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/categories/:id",
      {
        id: '@id'
      });
  }])
