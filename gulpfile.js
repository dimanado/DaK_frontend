var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  connect = require('gulp-connect'),
  replace       = require('gulp-replace'),
  rename        = require('gulp-rename'),
  templateCache = require('gulp-angular-templatecache');



function setEndpoints(env) {
  gulp.src(['./app/scripts/config.js.template'])

    .pipe(replace(/\{\{(api|socket|service)Endpoint\}\}/g, function (match) {
      return JSON.stringify(endPoints[env][match.replace(/\{|\}/g, '')]);
    }))
    .pipe(rename('./app/scripts/config.js'))
    .pipe(gulp.dest('.'));
}

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      host: 'localhost',
      port: 9000,
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*', function() {
    gulp.src('./app/**/*').pipe(connect.reload());
  });
});

gulp.task('set_develop_endpoints', function() {
  setEndpoints('development');
});

gulp.task('buildTemplates', function() {
  var options = {
    output: 'app/scripts',
    strip: 'app/views',
    moduleName: 'templates'
  };

  gulp.src('app/views/*.html')
    .pipe(templateCache(options))
    .pipe(gulp.dest(options.output));
});

//gulp.task('default', ['webserver', 'watch']);
 gulp.task('default', ['set_develop_endpoints', 'buildTemplates', 'watch', 'webserver']);
