angular
  .module('Course')
  .factory('Subscription', ['$resource', 'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/subscriptions/:id/:str",
      {
        id: '@id',
        str: '@str'
      },{
        charge: {method:'DELETE', params:{id: '@id'}}
      });
  }]);
