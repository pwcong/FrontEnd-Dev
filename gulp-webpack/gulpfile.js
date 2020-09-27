const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass');

// use the latest css syntax
const postcss = require('gulp-postcss');
const cssnext = require('postcss-preset-env');

// minify css styles
const cleanCSS = require('gulp-clean-css');

// convert es6 to es5
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const gulpWebpack = require('webpack-stream');

const isProd = process.env.NODE_ENV === 'production';

///////////////////////////////////////////////
/*              npm run dev                  */
///////////////////////////////////////////////
function dev(cb) {
  browserSync.init({
    server: './app',
  });

  gulp.watch('app/scss/**/*.scss', sassDev);
  gulp.watch('app/src/**/*.js', jsDev);
  gulp.watch('app/*.html').on('change', browserSync.reload);

  cb();
}

function jsDev(cb) {
  gulp
    .src('app/src/index.js')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());

  cb();
}

function sassDev(cb) {
  gulp
    .src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([cssnext()]))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());

  cb();
}

///////////////////////////////////////////////
/*              npm run build                */
///////////////////////////////////////////////
function build(cb) {
  gulp.src('app/*.html').pipe(gulp.dest('dist'));
  cb();
}

function jsProd(cb) {
  gulp
    .src('app/src/index.js')
    .pipe(sourcemaps.init())
    .pipe(gulpWebpack(webpackConfig))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));

  cb();
}

function sassProd(cb) {
  gulp
    .src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(postcss([cssnext()]))
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));

  cb();
}

exports.default = isProd
  ? gulp.series(sassProd, jsProd, build)
  : gulp.series(sassDev, jsDev, dev);
