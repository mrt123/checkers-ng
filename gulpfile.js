var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('default', function() {

});


gulp.task('less', function () {
  return gulp.src('app/css/*.less')
      .pipe(less({
        paths: []
      }))
      .pipe(gulp.dest('app/css'));
});