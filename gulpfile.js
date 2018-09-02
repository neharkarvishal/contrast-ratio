var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('autoprefixer');
var cleancss = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var sass = require('gulp-ruby-sass');
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('build:styles', function () {
    return sass('source/*.scss', {
        style: 'compressed',
        trace: true,
        loadPath: ['source/']
    }).pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .pipe(cleancss())
        .pipe(gulp.dest(''))
        .on('error', gutil.log);
});

gulp.task('build:scripts', function () {
    return gulp.src('source/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(''))
        .on('error', gutil.log);
});

gulp.task('build:html', function () {
    return gulp.src('source/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(''))
        .on('error', gutil.log);
});

gulp.task('clean:all', function (callback) {
    del(['*.css', '*.html', 'contrast-ratio.js','color.js','incrementable.js'])
    callback();
});

gulp.task('build:all', function (callback) {
    runSequence('clean:all', ['build:styles', 'build:scripts', 'build:html'],
        callback);
});