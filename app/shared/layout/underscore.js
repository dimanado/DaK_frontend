angular
  .module('Layout')
  .factory('_', ['$window', function($window) {
    return $window._;
  }]);
