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
  gulp.src('./app/views/**/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/scripts/**/*.js')
    .pipe(connect.reload());
});

//сделать группировку всех scss в main.css
gulp.task('scss', function () {
  gulp.src('./app/styles/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/views/**/*.html'], ['html']);
  gulp.watch(['./app/styles/scss/**/*.scss'], ['scss']);
  gulp.watch(['./app/scripts/**/*.js'], ['js']);
});

gulp.task('default', ['server', 'watch']);
