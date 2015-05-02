
var gulp = require("gulp");
var rimraf = require("rimraf");
var fs = require("fs");
var watch = require("gulp-watch");
var rename = require("gulp-rename");
var minifycss = require("gulp-minify-css");
var sass = require("gulp-sass");

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    lib: "./" + project.webroot + "/lib/",
    dist: "./" + project.webroot + "/styles",
    bower: "./bower_components/",
    styles: "./Styles/**/*.scss",
    scripts: "./Scripts/**/*.ts"
};

gulp.task("clean", function (cb) {
    rimraf(paths.lib, cb);
});

//Takes SCSS files, transpiles to both uniminified and minified CSS, adding them to dist.
gulp.task("styles", function () {
    gulp.src(paths.styles)
    .pipe(sass({ style: "expanded" }))
    .pipe(gulp.dest(paths.dist))
    .pipe(rename({ suffix: ".min" }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.dist));
});


gulp.task("default", ["clean"], function () {
    gulp.watch(paths.styles, ["styles"]);
    gulp.watch(paths.scripts, ["scripts"]);
});
