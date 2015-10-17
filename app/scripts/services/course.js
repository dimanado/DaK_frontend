angular
  .module('Dak.services',[])
  .factory('Course', ['$resource', 'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/courses/:id/:URLStr",
      {
        id: '@id',
        URLStr: '@URLStr'
      });
  }])
