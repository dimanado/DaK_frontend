'use strict';

angular
  .module('Dak', [
    'config', 'ngAnimate', 'ngCookies', 'ngMessages', 'ngPassword', 'ngResource', 'Auth', 'Layout',
    'Home:Course', 'ngSanitize', 'ngTouch', 'ng-token-auth', 'ui.router', 'ui.bootstrap.popover',
    'ngFileUpload', "com.2fdevs.videogular", 'Home:Video', 'Video', 'Comment',
    'Course', "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster"
  ])

  .config(['$stateProvider', '$urlRouterProvider', 'ENV', '$authProvider',

    function ($stateProvider, $urlRouterProvider, ENV, $authProvider) {
      $stateProvider
        .state('applicationLayout', {
          abstract: true,
          templateUrl: 'shared/layout/applicationLayout.html',
          controller: 'LayoutCtrl as layout'
        })
        .state('applicationLayout.registration', {
          url: '/sign_up',
          templateUrl: 'components/auth/registration.html',
          controller: 'AuthCtrl as auth'
        })
        .state('applicationLayout.authentication', {
          url: '/sign_in',
          templateUrl: 'components/auth/authentication.html',
          controller: 'AuthCtrl as auth'
        })
        .state('applicationLayout.courses', {
          url: '/courses',
          templateUrl: 'components/course/courses.html',
          controller: 'CoursesCtrl as courses'
        })
        .state('applicationLayout.videos', {
          url: '/course/:id/videos',
          templateUrl: 'components/video/videos.html',
          controller: 'homeVideoCtrl as video',
          resolve: {
            login: function($auth, $state) {
              checkAuthenticationAndLogout($auth, $state);
            }
          }
        })
        .state('applicationLayout.video', {
          url: '/video/:id',
          templateUrl: 'components/video/currentVideo.html',
          controller: 'CurrentVideoCtrl as video'
        })
        .state('applicationLayout.homeLayout', {
          abstract: true,
          templateUrl: 'components/home/layout/homeLayout.html',
          resolve: {
            login: function($auth, $state) {
              checkAuthenticationAndLogout($auth, $state);
            }
          }
        })
        .state('applicationLayout.homeLayout.home', {
          url: '/home/profile',
          templateUrl: 'components/home/profile/home.html'
          //controller: 'CoursesCtrl as courses'
        })
        .state('applicationLayout.homeLayout.myCourses', {
          url: '/home/Courses',
          templateUrl: 'components/home/course/myCourses.html',
          controller: 'HomeCourseCtrl as course'
        })
        .state('applicationLayout.homeLayout.video', {
          url: '/home/course/:id/videos',
          templateUrl: 'components/home/video/myVideos.html',
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
