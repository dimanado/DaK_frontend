'use strict';

angular
  .module('Dak', [
    'config', 'Dak.controllers',
    'ngAnimate', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngTouch', 'ng-token-auth', 'ui.router'
  ])



  .config(['$stateProvider', '$urlRouterProvider', 'ENV', '$authProvider',

    function ($stateProvider, $urlRouterProvider, ENV, $authProvider) {
      $stateProvider
        .state('registration', {
          url: '/sign_up',
          templateUrl: 'views/registration.html',
          controller: 'AuthCtrl as auth'
        })
        .state('authentication', {
          url: '/sign_in',
          templateUrl: 'views/authentication.html',
          controller: 'AuthCtrl as auth'
        })
        .state('main', {
          url: '/',
          templateUrl: 'views/main.html'
        });



      // $urlRouterProvider.otherwise('/sign_in');

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
  }]);
