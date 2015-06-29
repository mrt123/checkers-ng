var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', function() {

});


gulp.task('less', function () {
  return gulp.src('app/css/*.less')
      .pipe(less({
        paths: []
      }))
      .pipe(gulp.dest('app/css'))
      .pipe(reload({ stream:true }));
});

// watch files for changes and reload
gulp.task('serve', ['less'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html',  '*.js', 'views/*/*'], {cwd: 'app'}, reload);   // cwd = current working dir.

  gulp.watch('app/css/*.less', ['less']);  // inject pre-processed css without page reload.
});