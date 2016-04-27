var gulp = require('gulp');
var del = require('del');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var browserify = require('browserify');
var nodemon = require('gulp-nodemon');
var run = require('gulp-run');
var eslint = require('gulp-eslint');

gulp.task('lint', function(){
  return gulp
    .src(['**/*.{js,jsx}','!node_modules/**', '!public/**', '!test/**'])
    .pipe(eslint())
    .pipe(eslint.result(function (result) {
      // Called for each ESLint result. 
      console.log('ESLint result: ' + result.filePath);
      console.log('# Messages: ' + result.messages.length);
      console.log('# Warnings: ' + result.warningCount);
      console.log('# Errors: ' + result.errorCount);
    }))
    .pipe(eslint.format())

    .pipe(eslint.failOnError());
});

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
  return del(['dist', 'build', 'coverage', 'public/views', 'public/application.js']);
});

gulp.task('browserify-jsx', ['clean', 'install-dependencies'], function() {
  return browserify({
      entries: 'src/views/app.jsx',
      debug: true,
      transform: [reactify]
    })
    .bundle()
    .pipe(source('application.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('launch', ['browserify-jsx'], function () {
  
  var started = false;
  
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    if (!started) {
      started = true; 
    } 
  });
});

gulp.task('install-dependencies', function(){
  return run('npm install').exec();
})

gulp.task('default', ['launch'], function(){});