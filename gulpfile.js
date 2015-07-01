var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['develop']);

gulp.task('develop', ['serve'], function() {
});


gulp.task('less', function () {
  return gulp.src('app/css/*.less')
      .pipe(less({
        paths: []
      }))
      .pipe(gulp.dest('app/css'))
      .pipe(reload({ stream:true }));
});

gulp.task('concat', function () {
    gulp.src(["*.js", "views/**/*.js", "components/**/*.js"], {cwd: 'app'})
        .pipe(sourcemaps.init())
        .pipe(concat('_app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/_dist/'))
});

// watch files for changes and reload
gulp.task('serve', ['less', 'concat'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

    // notice: '**/*' or '/**/*' will watch entire drive
    gulp.watch(["*.js", "views/**/*.js", "components/**/*.js"], {cwd: 'app'}, ['concat', reload]);
    gulp.watch(['./**/*.html'], {cwd: 'app'}, reload);

  gulp.watch('app/css/*.less', ['less']);  // inject pre-processed css without page reload.
});