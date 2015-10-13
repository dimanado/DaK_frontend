var gulp = require('gulp'),
    connect = require('gulp-connect'),


gulp.task('server', function() {
  connect.server({
    root: ['app', '.'],
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/views/*.html'], ['html']);
});

gulp.task('serve', ['server', 'watch']);
