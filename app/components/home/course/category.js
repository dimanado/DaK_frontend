angular
  .module('Home:Course')
  .factory('Category', ['$resource', 'ENV', function($resource, ENV) {
    return $resource(ENV.apiEndpoint + "/categories/:id",
      {
        id: '@id'
      });
  }])
  .directive('showonhoverparent', function() {
      return {
        link : function(scope, element, attrs) {
          element.parent().bind('mouseenter', function() {
            element.show();
          });
          element.parent().bind('mouseleave', function() {
            element.hide();
          });
        }
      };
    });
