const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass');

// use the latest css syntax
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');

// minify css styles
const cleanCSS = require('gulp-clean-css');

// convert es6 to es5
const babel = require('gulp-babel');

// minify javascript
const uglify = require('gulp-uglify');
const pump = require('pump');

///////////////////////////////////////////////
/*              npm run dev                  */
///////////////////////////////////////////////
gulp.task('dev', ['sass', 'js'], function () {

    browserSync.init({
        server: './app'
    });

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/src/**/*.js', ['js']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('js', function () {

    return gulp.src('app/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());

});

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(postcss([cssnext()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

///////////////////////////////////////////////
/*              npm run build                */
///////////////////////////////////////////////
gulp.task('build', ['sass-prod', 'js-prod'], function(){

    gulp.src('app/*.html').pipe(gulp.dest('dist'));

});

gulp.task('js-prod', function (cb) {

    pump([
            gulp.src('app/src/**/*.js'),
            babel(),
            uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );

});

gulp.task('sass-prod', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss([cssnext()]))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'));
});