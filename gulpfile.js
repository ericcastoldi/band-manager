var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');


gulp.task('init-istanbul', function () {
  return gulp.src(['src/api/*.js'])
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('cover', ['init-istanbul'], function () {
  return gulp.src(['test/api/*Spec.js'])
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({ reporters: [ 'lcov' ] }));
});

gulp.task('mocha', function() {
    return gulp.src(['test/api/*Spec.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['src/api/*.js', 'test/api/*Spec.js'], ['mocha']);
});

gulp.task('clean', function () {
  return del(['dist', 'build', 'coverage', 'public/views']);
});

gulp.task('build-jsx', function () {
  return  gulp.src('src/views/*.jsx')
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('public/views'));
});