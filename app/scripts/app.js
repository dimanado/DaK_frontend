'use strict';

angular
  .module('Dak', [
    'config', 'Dak.controllers', 'Dak.directives',
    'ngAnimate', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngTouch', 'ng-token-auth', 'ui.router', 'Dak.services','ngFileUpload',
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster"
  ])

  .config(['$stateProvider', '$urlRouterProvider', 'ENV', '$authProvider',

    function ($stateProvider, $urlRouterProvider, ENV, $authProvider) {
      $stateProvider
        .state('applicationLayout', {
          abstract: true,
          templateUrl: 'views/applicationLayout.html',
          controller: 'LayoutCtrl as layout'
        })
        .state('applicationLayout.registration', {
          url: '/sign_up',
          templateUrl: 'views/registration.html',
          controller: 'AuthCtrl as auth'
        })
        .state('applicationLayout.authentication', {
          url: '/sign_in',
          templateUrl: 'views/authentication.html',
          controller: 'AuthCtrl as auth'
        })
        .state('applicationLayout.courses', {
          url: '/courses',
          templateUrl: 'views/courses.html',
          controller: 'CoursesCtrl as courses'
        })
        .state('applicationLayout.videos', {
          url: '/course/:id/videos',
          templateUrl: 'views/videos.html',
          controller: 'homeVideoCtrl as video'
        })
        .state('applicationLayout.video', {
          url: '/video/:id',
          templateUrl: 'views/currentVideo.html',
          controller: 'CurrentVideoCtrl as video'
        })

        .state('applicationLayout.homeLayout', {
          abstract: true,
          templateUrl: 'views/home/homeLayout.html',
          resolve: {
            login: function($auth, $state) {
              checkAuthenticationAndLogout($auth, $state);
            }
          }
        })
        .state('applicationLayout.homeLayout.home', {
          url: '/home/profile',
          templateUrl: 'views/home/home.html'
          //controller: 'CoursesCtrl as courses'
        })
        .state('applicationLayout.homeLayout.myCourses', {
          url: '/home/Courses',
          templateUrl: 'views/home/myCourses.html',
          controller: 'HomeCourseCtrl as course'
        })
        .state('applicationLayout.homeLayout.video', {
          url: '/home/course/:id/videos',
          templateUrl: 'views/home/myVideos.html',
          controller: 'homeVideoCtrl as video'
        });

      function checkAuthenticationAndLogout($auth, $state) {
        $auth.validateUser().then(function(data) {
        }, function(data) {
          $state.go('applicationLayout.authentication');
        })
      }


      $urlRouterProvider.otherwise('/courses');

      $authProvider.configure({
        apiUrl: ENV.apiEndpoint,
        storage: 'localStorage'
      });
  }]);
