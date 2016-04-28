var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var run = require('gulp-run');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var babel = require('babel-core/register');
var del = require('del');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var browserify = require('browserify');
var isparta = require('isparta');
var runSequence = require('run-sequence');

// Transform all required files with Babel
require('babel-core/register');

// Files to process
var TEST_FILES = 'test/**/*Spec.{jsx,js}';
var SRC_FILES = 'src/**/*.{jsx,js}';

gulp.task('clean', function () {
  return del(['dist', 'build', 'coverage', 'public/views', 'public/application.js']);
});


gulp.task('lint', function(){
  return gulp
    .src(['**/*.{js,jsx}', '!coverage/**', '!node_modules/**', '!public/**', '!test/**'])
    .pipe(eslint())
    .pipe(eslint.result(function (result) {
      console.log('Linted file: ' + result.filePath + '(Errors: ' + result.errorCount + '| Warnings: ' + result.warningCount + ')'); 
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  return gulp.src(TEST_FILES, {read: false})
    .pipe(mocha());
});

gulp.task('cover', ['init-istanbul'], function () {
  return gulp.src(['test/api/*Spec.js'])
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({ reporters: [ 'lcov' ] }));
});

gulp.task('init-istanbul', function () {
  return gulp.src(['src/api/*.js'])
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});


gulp.task('browserify', ['clean'], function() {
  return browserify({
      entries: 'src/views/app.jsx',
      debug: true,
      transform: [reactify]
    })
    .bundle()
    .pipe(source('application.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('launch', ['browserify'], function () {
  
  var started = false;
  
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    if (!started) {
      started = true; 
    } 
  });
});

gulp.task('default', ['launch'], function(){});

gulp.task('qa', ['clean'], function(done){
  runSequence('lint', 'test', done);
});

gulp.task('travis', function(done){
  runSequence('qa', 'cover', done);
});

gulp.task('tdd', function(done) {
  gulp.watch([ TEST_FILES, SRC_FILES ], ['qa']).on('error', gutil.log);
});





























/*
 * Instrument files using istanbul and isparta
 */
gulp.task('coverage:instrument', function() {
  return gulp.src(SRC_FILES)
    .pipe(istanbul({
      includeUntested: true,
      preserveComments: true,  
      noCompact:true,
      instrumenter: isparta.Instrumenter // Use the isparta instrumenter (code coverage for ES6)
      // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulopt)
      // ...
    }))
    .pipe(istanbul.hookRequire()); // Force `require` to return covered files
});

/*
 * Write coverage reports after test success
 */
gulp.task('coverage:report', function(done) {
  return gulp.src(SRC_FILES, {read: false})
    .pipe(istanbul.writeReports({
      // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulwritereportsopt)
      // ...
    }));
});

/**
 * Run unit tests with code coverage
 */
gulp.task('test:coverage', function(done) {
  runSequence('coverage:instrument', 'test', 'coverage:report', done);
});
