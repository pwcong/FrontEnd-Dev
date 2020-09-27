const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass');

// use the latest css syntax
const postcss = require('gulp-postcss');
const cssnext = require('postcss-preset-env');

// minify css styles
const cleanCSS = require('gulp-clean-css');

// minify javascript
const uglify = require('gulp-uglify');
const pump = require('pump');

// static asset revisioning by appending content hash to filenames
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

const isProd = process.env.NODE_ENV === 'production';

///////////////////////////////////////////////
/*              npm run dev                  */
///////////////////////////////////////////////
function dev(cb) {
  browserSync.init({
    server: './app',
  });

  gulp.watch('app/scss/**/*.scss', sassDev);
  gulp.watch('app/js/**/*.js', jsDev);
  gulp.watch('app/*.html').on('change', browserSync.reload);
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

function jsDev(cb) {
  gulp.src('app/js/**/*.js').pipe(browserSync.stream());
  cb();
}

///////////////////////////////////////////////
/*              npm run build                */
///////////////////////////////////////////////
function build(cb) {
  gulp
    .src(['dist/rev/**/*.json', 'app/*.html'])
    .pipe(
      revCollector({
        replaceReved: true,
      })
    )
    .pipe(gulp.dest('dist'));
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
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/css'));

  cb();
}

function jsProd(cb) {
  pump(
    [
      gulp.src('app/js/**/*.js'),
      sourcemaps.init(),
      uglify(),
      rev(),
      sourcemaps.write('.'),
      gulp.dest('dist/js'),
      rev.manifest(),
      gulp.dest('dist/rev/js'),
    ],
    cb
  );
}

exports.default = isProd
  ? gulp.series(sassProd, jsProd, build)
  : gulp.series(sassDev, jsDev, dev);
