var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('server', ['watch'], function() {
  connect.server({
    root: ['app', '.'],
    port: 9000,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/**/*.js')
    .pipe(connect.reload());
});

//сделать группировку всех scss в main.css
gulp.task('scss', function () {
  gulp.src('./assets/styles/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./assets/styles/scss/**/*.scss'], ['scss']);
  gulp.watch(['./app/**/*.js'], ['js']);
});

gulp.task('default', ['server', 'watch']);

var ngGraph = require('gulp-angular-architecture-graph');
 
gulp.task('default', function(){
    gulp.src('./app/**/*.js', [''])
        .pipe(ngGraph({
            dest: 'architecture'
        }));
});
