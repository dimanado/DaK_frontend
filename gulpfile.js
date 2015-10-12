var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  connect = require('gulp-connect');

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

gulp.task('default', ['webserver', 'watch']);

  //csso = require('gulp-csso'),
  //uglify = require('gulp-uglify'),
  //concat = require('gulp-concat'),
  //connect = require('gulp-connect'),
  //inject = require('gulp-inject'),
  //bowerFiles = require('gulp-main-bower-files'),
  //es = require('event-stream'),
  //historyApiFallback = require('connect-history-api-fallback');
  //angularFileSort = require('gulp-angular-filesort'),
  //sourcemaps = require('gulp-sourcemaps'),
  //ngAnnotate = require('gulp-ng-annotate'),
  //gulpFilter = require('gulp-filter');

//var jsSources = ['./app/scripts/**/*.js'];
//var cssSources = ['./app/styles/**/*.css'];
//var htmlSources = ['./app/views/**/*.html'];
//
//var bootstrapOverride = ['./dist/js/bootstrap.js', './dist/css/bootstrap.css'];
//
//gulp.task('server', function() {
//  connect.server({
//    root: './build',
//    livereload: true,
//    middleware: function(connect, opt) {
//      return [ historyApiFallback() ];
//    }
//  });
//});
//
//gulp.task('http-server', function() {
//  connect()
//    .use(require('connect-livereload')())
//    .use(connect.static('./public'))
//    .listen('9000');
//
//  console.log('Server listening on http://localhost:9000');
//});
//
//
//gulp.task('watch', function() {
//  gulp.watch('./app/**/*', function() {
//    gulp.src('./app/**/*').pipe(connect.reload());
//  });
//});
//
//gulp.task('index', function() {
//  var appSources = gulp.src(cssSources, {read: false});
//
//  var angularSources = gulp.src(jsSources)
//    .pipe(angularFileSort());
//
//  var bowerSources = gulp.src('./bower.json')
//    .pipe(bowerFiles({
//      overrides: {
//        bootstrap: {
//          main: bootstrapOverride
//        }
//      }
//    }));
//
//  gulp.src('./app/index.html')
//    .pipe(inject(es.merge(appSources, angularSources), {relative: true}))
//    .pipe(inject(es.merge(bowerSources), {name: 'bower', relative: true}))
//    .pipe(gulp.dest('./app'));
//});
//
//gulp.task('build', function() {
//  gulp.src(htmlSources)
//    .pipe(gulp.dest('./build/views'))
//
//  var js = gulp.src(jsSources)
//    .pipe(angularFileSort())
//    .pipe(concat('index.js'))
//    .pipe(ngAnnotate())
//    .pipe(uglify())
//    .pipe(gulp.dest('./build/scripts'));
//
//  var css = gulp.src(cssSources)
//    .pipe(csso())
//    .pipe(concat('index.css'))
//    .pipe(gulp.dest('./build/styles'));
//
//  var filterJs = gulpFilter('**/*.js', {restore: true});
//  var filterCss = gulpFilter('**/*.css', {restore: true});
//
//  var bower = gulp.src('./bower.json')
//    .pipe(bowerFiles({
//      overrides: {
//        bootstrap: {
//          main: bootstrapOverride
//        }
//      }
//    }))
//    .pipe(filterJs)
//    .pipe(concat('vendor.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('./build/scripts'))
//    .pipe(filterJs.restore)
//    .pipe(filterCss)
//    .pipe(concat('vendor.css'))
//    .pipe(csso())
//    .pipe(gulp.dest('./build/styles'))
//    .pipe(filterCss.restore)
//
//  gulp.src('./app/index.html')
//    .pipe(inject(es.merge(js, css)))
//    .pipe(inject(es.merge(bower), {name: 'bower'}))
//    .pipe(gulp.dest('./build'));
//});
//
//gulp.task('default', ['server', 'watch']);
//



