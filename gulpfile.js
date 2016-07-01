var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var del = require('del');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var browserify = require('browserify');
var runSequence = require('run-sequence');
//var babel = require('gulp-babel');

// Transform all required files with Babel
require('babel-core/register');

// Files to process
var SRC_FILES = 'src/**';
var TEST_FILES = 'test/**/*Spec.{jsx,js}';

gulp.task('clean', function () {
  return del(['dist', 'build', 'coverage', 'public']);
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
  return gulp.src(['test/**/*Spec.{js,jsx}'])
    .pipe(mocha({reporter: 'spec', ui: 'bdd'}))
    .pipe(istanbul.writeReports({ reporters: [ 'lcov' ] }));
});

gulp.task('init-istanbul', function () {
  return gulp.src(['src/**/*.{js,jsx}'])
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});


gulp.task('browserify', function() {
  return browserify({
      entries: 'src/components/App.jsx',
      debug: true,
      transform: [reactify]
    })
    .bundle()
    .pipe(source('application.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('copy-webapp', function(){
  return gulp.src('webapp/**')
    .pipe(gulp.dest('public'));
});

gulp.task('launch', function () {

  var started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    if (!started) {
      started = true;
    }
  });
});

gulp.task('default', ['clean'], function(done){
  runSequence('copy-webapp', 'browserify', 'launch', done);
});

gulp.task('qa', ['lint', 'test'], function(){
});

gulp.task('travis', ['clean'], function(done){
  runSequence('lint', 'cover', done);
});


gulp.task('jsx-coverage', require('gulp-jsx-coverage').createTask({
  src: ['test/**/*.{js,jsx}'],
  istanbul: {
      includeUntested: true,
      preserveComments: true,
      coverageVariable: '__MY_TEST_COVERAGE__',
      exclude: /node_modules|fakedom.js/
  },
  transpile: {
        babel: {
            include: /\.jsx?$/,
            exclude: /node_modules/,
            omitExt: ['.js', '.jsx']
        }
    },
    coverage: {
        reporters: ['lcov'],
        directory: 'coverage'
    },
    mocha: {
        reporter: 'spec'
    }
}));
