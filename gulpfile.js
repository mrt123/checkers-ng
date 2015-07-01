var angularModules = require("gulp-angular-modules");
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

gulp.task("modules", function() {

  var moduleOptions = {
    name: "gulp-angular-modules",
    modules: ['ngRoute']
  };

  return gulp.src(["app/views/**/*.js", "app/components/**/*.js"])
      .pipe(angularModules("gulp-angular-modules.js", moduleOptions)) // Name of the file generated
      .pipe(gulp.dest("./app/"))
});

// watch files for changes and reload (order of dependencies matters).
gulp.task('serve', ['less', 'modules', 'concat'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

    // notice: '**/*' or '/**/*' will watch entire drive
    gulp.watch(["*.js", "views/**/*.js", "components/**/*.js"], {cwd: 'app'}, ['concat', 'modules', reload]);  // TODO: pipe watch output to modules without getting src again!
    gulp.watch(['./**/*.html'], {cwd: 'app'}, reload);

  gulp.watch('app/css/*.less', ['less']);  // inject pre-processed css without page reload.
});