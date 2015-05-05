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

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    distFolder: "./" + project.webroot,
    distVendorDir: project.webroot + "/lib/",
    distCSSDir: project.webroot + "/css",
    distCSSFiles: project.webroot + "/css/*.css",
    distJSDir: project.webroot + "/js",
    distJSFiles: project.webroot + "/js/*.js",
    distIndexFile: project.webroot + "/index.html",
    srcSCSSFiles: "./Styles/**/*.scss",
    srcTSFiles: "./Scripts/**/*.ts",
    srcIndexFile: "./Scripts/index.html",
    typings: "./Typings",
    bower: "./bower_components/**/*.min.js"
};

gulp.task("clean-styles", function () {
    return gulp.src(paths.distCSSDir, { read: false })
    .pipe(clean());
});

gulp.task("clean-app-scripts"), function () {
    return gulp.src(paths.distJSDir, { read: false })
    .pipe(clean());
}

gulp.task("clean-vendor-scripts"), function () {
    return gulp.src(paths.distVendorDir, { read: false })
    .pipe(clean());
}

//Transpiles app SCSS files into minifed CSS and writes them into dist.
gulp.task("transpile-scss", ["clean-styles"], function () {
    return gulp.src(paths.srcSCSSFiles)
        .pipe(sass({ style: "expanded" }))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.distCSSDir));
});

//Transpiles app typescript files to javascript and writes them into dist.
gulp.task('transpile-ts', ["clean-app-scripts"], function () {
    var tsResult = gulp.src(paths.srcTSFiles)
        .pipe(flatten())
        .pipe(ts({
            typescript: require("typescript"),
            declarationFiles: false
        }));
    return tsResult.js.pipe(gulp.dest(paths.distJSDir));
});

//Copies Bower JS main files to dist.
gulp.task('copy-vendor-scripts', ["clean-vendor-scripts"], function () {
    return gulp.src(wiredep().js) //Bower main JS source files
            .pipe(gulp.dest(paths.distVendorDir));
});

//Copies Bower CSS main files to dist
gulp.task('copy-vendor-styles', ["clean-styles"], function () {
    return gulp.src(wiredep().css) //Bower main CSS source files
        .pipe(gulp.dest(paths.distCSSDir));
})

//Injects JS and CSS reference tags in index.html from Bower and app src files.
gulp.task('wiredep', ["copy-vendor-scripts", "copy-vendor-styles", "transpile-scss", "transpile-ts"], function () {
    return gulp.src(paths.srcIndexFile)
       .pipe(wiredep.stream({
           fileTypes: {
               html: {
                   replace: {
                       js: function (filePath) {
                           return '<script src="' + 'lib/' + filePath.split('/').pop() + '"></script>';
                       },
                       css: function (filePath) {
                           return '<link rel="stylesheet" href="' + 'css/' + filePath.split('/').pop() + '"/>';
                       }
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

   .pipe(inject(gulp.src([paths.distCSSFiles], { read: false }), {
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