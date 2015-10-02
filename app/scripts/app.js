'use strict';

angular
  .module('Dak', [
    'config', 'Dak.controllers',
    'ngAnimate', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngTouch', 'ng-token-auth', 'ui.router', 'Dak.services'
  ])

  .config(['$stateProvider', '$urlRouterProvider', 'ENV', '$authProvider',

    function ($stateProvider, $urlRouterProvider, ENV, $authProvider) {
      $stateProvider
        .state('layout.registration', {
          url: '/sign_up',
          templateUrl: 'views/registration.html',
          controller: 'AuthCtrl as auth'
        })
        .state('layout.authentication', {
          url: '/sign_in',
          templateUrl: 'views/authentication.html',
          controller: 'AuthCtrl as auth'
        })
        .state('layout', {
          abstract: true,
          templateUrl: 'views/layout.html',
          controller: 'LayoutCtrl as layout'
        })
        .state('layout.courses', {
          url: '/courses',
          templateUrl: 'views/courses.html',
          controller: 'CoursesCtrl as courses'
        })
        .state('layout.lhome', {
          abstract: true,
          templateUrl: 'views/home/lhome.html',
          resolve: {
            login: function($auth, $state) {
              checkAuthenticationAndLogout($auth, $state);
            }
          }
        })
        .state('layout.lhome.home', {
          url: '/home',
          templateUrl: 'views/home/home.html'
          //controller: 'CoursesCtrl as courses'
        })
        .state('layout.lhome.my_courses', {
          url: '/home/my_courses',
          templateUrl: 'views/home/my_courses.html',
          controller: 'HomeCourseCtrl as course'
        })

      function checkAuthenticationAndLogout($auth, $state) {
        $auth.validateUser().then(function(data) {
        }, function(data) {
          $state.go('layout.authentication');
        })
      }


      $urlRouterProvider.otherwise('/courses');

      $authProvider.configure({
        apiUrl: ENV.apiEndpoint,
        storage: 'localStorage'
      });
  }])
