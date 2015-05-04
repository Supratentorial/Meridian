
var gulp = require("gulp");
var rename = require("gulp-rename");
var minifycss = require("gulp-minify-css");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var ts = require('gulp-typescript');
var tslint = require("gulp-tslint");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var fs = require("fs");
var wiredep = require('wiredep').stream;

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    lib: project.webroot + "/lib/",
    css: project.webroot + "/css",
    js: project.webroot + "/js",
    index: project.webroot + "/index.html",
    dist: "./" + project.webroot,
    bower: "./bower_components/",
    styles: "./Styles/**/*.scss",
    ts: "./Scripts/**/*.ts",
    typings: "./Typings"
};

gulp.task("clean", function () {
    return del([paths.css, paths.js]);
});

//Takes SCSS files and transpiles to minifed CSS.
gulp.task("styles", function () {
    return gulp.src(paths.styles)
        .pipe(sass({ style: "expanded" }))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.css));
});

//Lints typescript
gulp.task("ts-lint", function () {
    return gulp.src(paths.ts)
        .pipe(tslint())
        .pipe(tslint.report("prose"));
});

//Compile typescript to javascript.
gulp.task('scripts',["ts-lint"], function () {
    var tsResult = gulp.src(paths.ts)
                       .pipe(ts({
                           typescript: require("typescript"),
                           declarationFiles: false,
                           noExternalResolve: true
                       }));
    tsResult.js.pipe(gulp.dest(paths.js));
});


gulp.task('bower', function () {
    gulp.src()
      .pipe(wiredep())
      .pipe(gulp.dest(paths.dist));
});

gulp.task("default", ["clean"], function () {
    gulp.watch(paths.styles, ["styles"]);
    gulp.watch(paths.ts, ["scripts"]);
});
