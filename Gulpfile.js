'use strict';

var gulp       = require('gulp'),
    del        = require('del'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sass       = require('gulp-sass'),
    plumber    = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    connect    = require('gulp-connect'),
    jade       = require('gulp-jade'),
    ngAnnotate = require('gulp-ng-annotate'),
    path = {
      JS_SRC: [
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'src/apps/angular/app.js',
        'src/apps/angular/constants.js',
        'src/apps/angular/config.js',
        'src/apps/angular/services/*.js',
        'src/apps/angular/views/**/*.js',
        'src/apps/angular/components/**/*.js'
      ],
      JS_MIN: 'build.min.js',
      JS_BLD: 'dist/js/',
      SASS_SRC: [
        'src/apps/angular/sass/*.scss',
        'src/apps/angular/sass/**/*.scss'
      ],
      SASS_BLD: 'dist/css/',
      JADE_SRC: [
        'src/apps/angular/views/**/*.jade',
        'src/apps/angular/components/**/*.jade'
      ],
      JADE_BLD: 'dist/views/',
      INDEX_SRC: 'src/index.html',
      INDEX_BLD: './',
      IMG_SRC: 'src/apps/angular/img/*',
      IMG_BLD: 'dist/img/',
      FONTS_SRC: 'src/apps/angular/fonts/*',
      FONTS_BLD: 'dist/fonts/'
    };

/**
 * Clean dest folder
 */
 gulp.task('clean-assets', function() {
   return del([
     'index.html'
   ]);
 });
gulp.task('clean-js', function() {
  return del([
    'dist/js/'
  ]);
});
gulp.task('clean-sass', function() {
  return del([
    'dist/sass/'
  ]);
});
gulp.task('clean-views', function() {
  return del([
    'dist/views/'
  ]);
});


/**
 * Concat & uglify JS
 */
gulp.task('js', ['clean-js'], function() {
  gulp.src(path.JS_SRC)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(plumber())
    .pipe(concat(path.JS_MIN))
    //.pipe(uglify())
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(gulp.dest(path.JS_BLD));
});

/**
 * Concat Sass
 */
gulp.task('sass', ['clean-sass'], function () {
  gulp.src(path.SASS_SRC)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(gulp.dest(path.SASS_BLD));
});

gulp.task('jade', ['clean-views'], function() {
  var YOUR_LOCALS = {};
  gulp.src(path.JADE_SRC)
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(path.JADE_BLD))
});

gulp.task('assets', ['clean-assets'], function () {
  gulp.src(path.INDEX_SRC)
    .pipe(gulp.dest(path.INDEX_BLD))
    .pipe(connect.reload());
  gulp.src([path.IMG_SRC])
    .pipe(gulp.dest(path.IMG_BLD))
    .pipe(connect.reload());
  gulp.src(path.FONTS_SRC)
    .pipe(gulp.dest(path.FONTS_BLD))
    .pipe(connect.reload());
});


/**
 * Connect server
 */
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

/**
 * Watch tasks
 */
gulp.task('watch', function() {
  gulp.watch(path.INDEX_SRC, ['assets']);
  gulp.watch(path.JS_SRC, ['js']);
  gulp.watch(path.SASS_SRC, ['sass']);
  gulp.watch(path.JADE_SRC, ['jade']);
})

/**
 * Tasks
 */
gulp.task('default', ['js', 'sass', 'jade', 'assets', 'connect', 'watch']);
