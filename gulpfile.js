var angularModules = require("gulp-angular-modules");
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jsFiles = [
    "*.js", 
    "views/**/*.js",
    "components/**/*.js"
];


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

gulp.task("modules", function() {

    var moduesOpts = {
        name: "gulp-angular-modules",
        modules: ['ngRoute']
    };

    return gulp.src(["app/views/**/*.js", "app/components/**/*.js"])
        .pipe(angularModules("gulp-angular-modules.js", moduesOpts)) // Name of the file generated
        .pipe(gulp.dest("./app/"))
});

gulp.task('concat' , ['modules'] ,function () {
    gulp.src(jsFiles, {cwd: 'app'})
        .pipe(sourcemaps.init())
        .pipe(concat('_app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/_dist/'));
});

// watch files for changes and reload (order of dependencies matters).
gulp.task('serve', ['less', 'modules', 'concat'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });

    var watchOpts = {
        cwd: 'app'
    };

    // notice: '**/*' or '/**/*' will watch entire drive
    gulp.watch(jsFiles, watchOpts, ['modules', 'concat', reload]);  // TODO: pipe watch output to modules without getting src again!
    gulp.watch(['./**/*.html'], watchOpts, reload);
    gulp.watch('app/css/*.less', ['less']);  // inject pre-processed css without page reload.
});