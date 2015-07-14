var angularModules = require("gulp-angular-modules");
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jsFiles = [
    "./app/*.js",
    "./app/views/**/*.js",
    "./app/components/**/*.js"
];
var cssFiles = ['app/css/**/*.less', 'app/views/**/*.less', 'app/components/**/*.less'];

gulp.task('default', ['develop']);
gulp.task('develop', ['serve']);

gulp.task('less', function () {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: []
        }))
        .pipe(concat('app_dev.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/build/css'))  // must be same depth as views/ to match relative path to img/
        .pipe(browserSync.reload({ stream:true }));
});

gulp.task("modules", function() {

    var moduesOpts = {
        name: "gulp-angular-modules",
        modules: ['ngRoute']
    };

    return gulp.src(["app/views/**/*.js", "app/components/**/*.js"])
        .pipe(angularModules("gulp-angular-modules.js", moduesOpts)) // Name of the file generated
        .pipe(gulp.dest("./app/build/dev/"))
});

gulp.task('concat' , [] ,function () {
    gulp.src(jsFiles, {})
        .pipe(sourcemaps.init())
        .pipe(concat('app_dev.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/build/dev/'));
});

// watch files for changes and reload (order of dependencies matters).
gulp.task('serve', ['less', 'modules', 'concat'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        open: false
    });

    // notice: '**/*' or '/**/*' will watch entire drive
    gulp.watch(jsFiles, {}, ['modules', 'concat', reload]);  // TODO: pipe watch output to modules without getting src again!
    gulp.watch(['./**/*.html'], {}, reload);
    gulp.watch(cssFiles, ['less']);  // inject pre-processed css without page reload.
});