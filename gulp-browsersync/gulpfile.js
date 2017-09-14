const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass');

// use the latest css syntax
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');

// minify css styles
const cleanCSS = require('gulp-clean-css');

const uglify = require('gulp-uglify');
const pump = require('pump');

///////////////////////////////////////////////
/*              npm run dev                  */
///////////////////////////////////////////////
gulp.task('dev', ['sass', 'script'], function () {

    browserSync.init({
        server: './app'
    });

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch(['app/js/**/*.js', 'app/libs/**/*.js'], ['script']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('script', function () {

    return gulp.src(['app/js/**/*.js', 'app/libs/**/*.js'])
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
gulp.task('build', ['sass-prod', 'script-prod'], function () {
    gulp.src('app/*.html').pipe(gulp.dest('dist'));
});

gulp.task('script-prod', function (cb) {

    pump(
        [
            gulp.src('app/js/**/*.js'),
            uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );

    gulp.src('app/libs/**/*.js').pipe(gulp.dest('dist/libs'));

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