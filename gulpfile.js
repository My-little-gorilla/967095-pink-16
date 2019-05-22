"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var del = require("del");
var imagemin = require("gulp-imagemin");



gulp.task("clean", function () {
  return del("build");
});


gulp.task("copy", function(){
  return gulp.src([
    "source/*.html",
    "source/css/normalize.css",
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"

  ],{
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});




gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });



  gulp.task("html", function () {
    return gulp.src("source/*.html")
      .pipe(gulp.dest("build"));
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});


gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("css", "server"));


gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png, jpeg,svg}")
  .pipe(imagemin([

    imagemin.optipng({optimizationLevel: 0}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
]))
.pipe(gulp.dest("build/img"))
});




gulp.task("build", gulp.series("clean", "copy", "css", "images"));
gulp.task("start", gulp.series("build","server"));
