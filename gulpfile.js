var angularModules = require("gulp-angular-modules");
var debug = require('gulp-debug');
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var proxy = require('proxy-middleware');
var url = require('url');
var gulp_express = require('gulp-express');

var jsFiles = [
    "./app/*.js",
    "./app/views/**/*.js",
    "./app/components/**/*.js"
];
var cssFiles = ['app/css/**/*.less', 'app/views/**/*.less', 'app/components/**/*.less'];
var fontAwesomeFiles = [
    'app/css/customized/font-awesome.less',
    'app/css/customized/font-awesome-vars.less'
];
var assets = [
    './app/fonts*/*',   // moves together with encapsulating folder.
    './app/bower_components/font-awesome/fonts*/*',   // moves together with encapsulating folder.
    './app/img*/*'
];
var devServer = browserSync.create("developmentServer");

gulp.task('app_dev.css', function () {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: []
        }))
        .pipe(concat('app_dev.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/build/dev'));  // must be same depth as views/ to match relative path to img/
});

gulp.task('font-awesome_dev.css', function () {
    return gulp.src(fontAwesomeFiles)
        .pipe(debug({
            title: "font-awesome:   "
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('font-awesome_dev.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/build/dev'))
        .pipe(devServer.reload({stream: true}));
});

gulp.task('less', ['font-awesome_dev.css', 'app_dev.css'], function () {
});

gulp.task("modules", function () {

    var moduesOpts = {
        name: "gulp-angular-modules",
        modules: ['ngRoute']
    };

    return gulp.src(["app/views/**/*.js", "app/components/**/*.js"])
        .pipe(angularModules("gulp-angular-modules.js", moduesOpts)) // Name of the file generated
        .pipe(gulp.dest("./app/build/dev/"))
});

gulp.task('concat', [], function () {
    gulp.src(jsFiles, {})
        .pipe(sourcemaps.init())
        .pipe(concat('app_dev.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/build/dev/'));
});

gulp.task('move-dev-assets', function () {
    return gulp.src(assets)
        .pipe(debug({
            title: "moveAssets --->   "
        }))
        .pipe(gulp.dest("./app/build/dev/"));
});


gulp.task('restServer', function() {
    var restAppSrc = './app/rest/';
    var expressApp = restAppSrc + 'api.js';
    gulp_express.run([expressApp]);
    gulp.watch([restAppSrc + '**/*.js'], [gulp_express.run]);
});

// watch files for changes and reload (order of dependencies matters).
gulp.task('serve', ['less', 'modules', 'concat', 'move-dev-assets'], function () {

    var urlObj = url.parse('http://localhost:3005/api');
    urlObj.route = '/api';

    devServer.init({
        port: 3005,
        server: {
            baseDir: 'app',
            middleware: [proxy(urlObj)]
        },
        open: false
    });

    // notice: '**/*' or '/**/*' will watch entire drive
    gulp.watch(jsFiles, {}, ['modules', 'concat', devServer.reload]);  // TODO: pipe watch output to modules without getting src again!
    gulp.watch(['./**/*.html'], {}, devServer.reload);
    gulp.watch(cssFiles, ['less']);  // inject pre-processed css without page reload.
    gulp.watch(fontAwesomeFiles, ['font-awesome_dev.css']);
});


gulp.task('default', ['develop']);
gulp.task('develop', ['serve']);