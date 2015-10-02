angular
  .module('Dak.services')
  .factory('Course', Course);

Course.$inject = [
  '$resource'
];

function Course($resource) {
  console.log('Course service load');
  //courses.get()
  this.courses = $resource(
    "/courses/:id",
    {
      id: "@id"
    });
}
