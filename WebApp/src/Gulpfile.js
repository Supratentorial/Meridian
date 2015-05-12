/// <binding BeforeBuild='default' />

var gulp = require("gulp");
var rename = require("gulp-rename");
var minifycss = require("gulp-minify-css");
var sass = require("gulp-sass");
var ts = require('gulp-typescript');
var tslint = require("gulp-tslint");
var sourcemaps = require("gulp-sourcemaps");
var fs = require("fs");
var wiredep = require('wiredep');
var inject = require('gulp-inject');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var series = require('stream-series');

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    distFolder: "./" + project.webroot,
    distVendorDir: project.webroot + "/lib/",
    distCSSDir: project.webroot + "/css",
    distCSSFiles: project.webroot + "/css/*.css",
    distJSDir: project.webroot + "/js",
    distHTMLDir: project.webroot + "/html",
    distJSFiles: project.webroot + "/js/**/*.js",
    distIndexFile: project.webroot + "/index.html",
    srcSCSSFiles: "./Styles/**/*.scss",
    srcTSFiles: "./App/**/*.ts",
    srcIndexFile: "./App/index.html",
    typings: "./Typings/**/*.d.ts",
    bower: "./bower_components/**/*.min.js"
};

gulp.task("clean", function () {
    gulp.src(paths.distCSSDir, { read: false })
    .pipe(clean());
    gulp.src(paths.distVendorDir, { read: false })
    .pipe(clean());
    gulp.src(paths.distIndexFile, { read: false })
    .pipe(clean());
    return gulp.src(paths.distJSDir, { read: false })
    .pipe(clean());
});

//Transpiles app SCSS files into minifed CSS and writes them into dist.
gulp.task("transpile-scss", ["clean"], function () {
    return gulp.src(paths.srcSCSSFiles)
        .pipe(sass({ style: "expanded" }))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.distCSSDir));
});

//Transpiles app typescript files to javascript and writes them into dist.
gulp.task('transpile-ts', ["clean"], function () {
    var clientResult = gulp.src([paths.srcTSFiles, paths.typings])
        .pipe(ts({
            target: 'ES6',
            declarationFiles: false,
            noExternalResolve: true
        }));
    return clientResult.js.pipe(gulp.dest(paths.distJSDir));
});

//Copies vendor javascript files as well as Angular templates to dist directory.
gulp.task('copy-vendor-libs', ["clean"], function () {
    gulp.src(wiredep().js) //Bower main JS source files
    .pipe(gulp.dest(paths.distVendorDir));
    //return gulp.src(wiredep().css) //Bower main CSS source files
    //    .pipe(gulp.dest(paths.distCSSDir));
    return gulp.src(['App/**/*.html', '!App/index.html']).pipe(gulp.dest(paths.distHTMLDir));
});

//Injects JS and CSS reference tags in index.html from Bower and app src files.
gulp.task('wiredep', ["copy-vendor-libs", "transpile-scss", "transpile-ts"], function () {
    var appCSS = gulp.src('css/app.css' , { read: false });
    var vendorCSS = gulp.src([paths.distCSSFiles, '!css/app.css'], { read: false });
    return gulp.src(paths.srcIndexFile)
       .pipe(wiredep.stream({
           fileTypes: {
               html: {
                   replace: {
                       js: function (filePath) {
                           return '<script src="' + 'lib/' + filePath.split('/').pop() + '"></script>';
                       }
                       //css: function (filePath) {
                       //    return '<link rel="stylesheet" href="' + 'css/' + filePath.split('/').pop() + '"/>';
                       //}
                   }
               }
           }
       }))
   .pipe(inject(gulp.src([paths.distJSFiles], { read: false }), {
       addRootSlash: false,
       transform: function (filePath, file, i, length) {
           return '<script src="' + filePath.replace('wwwroot/', '') + '"></script>';
       }
   }))
   //Injects the CSS in series so app scripts always come after vendor scripts.
   .pipe(inject(series(appCSS, vendorCSS), {
       addRootSlash: false,
       transform: function (filePath, file, i, length) {
           return '<link rel="stylesheet" href="' + filePath.replace('wwwroot/', '') + '"/>';
       }
   }))
   .pipe(gulp.dest(paths.distFolder));
});

//Watches src SCSS, TS and Index files.
gulp.task("watch", function () {
    gulp.watch(paths.srcSCSSFiles, ["wiredep"]);
    gulp.watch(paths.srcTSFiles, ["wiredep"]);
    gulp.watch(paths.srcIndexFile, ["wiredep"]);
});

gulp.task("default", ["wiredep"], function () { });