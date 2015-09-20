'use strict';

angular
  .module('Dak', [
    'config', 'Dak.controllers',
    'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute',
    'ngSanitize', 'ngTouch', 'ng-token-auth'
  ])

  .run([],

    function() {

  })


  .config(['$stateProvider', '$urlRouterProvider', 'ENV'], 

    function ($stateProvider, $urlRouterProvider, ENV) {
      $stateProvider
        .state('registration', {
          url: '/sign_up',
          templateUrl: 'registration.html',
          controllerAs: 'authCtrl.js'
        })
        .state('authentication', {
          url: '/sign_in',
          templateUrl: 'authentication.html',
          controllerAs: 'authCtrl.js'
        });


      $urlRouterProvider.otherwise('/authentication');

      // $authProvider.configure([{
      //   default: {
      //     apiUrl: ENV.apiEndpoint,
      //     storage: 'localStorage'
      //   }
      // },
      // {
      //   service: {
      //     apiUrl: ENV.serviceEndpoint
      //   }
      // }]);

      $authProvider.configure({
        apiUrl: ENV.apiEndpoint,
        storage: 'localStorage'
      });
  });
