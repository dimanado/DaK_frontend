angular
  .module('Dak.services')
  .factory('_', ['$window', function($window) {
    return $window._;
  }]);
