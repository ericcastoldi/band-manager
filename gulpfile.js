var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var del = require('del');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var browserify = require('browserify');
var runSequence = require('run-sequence');

// Transform all required files with Babel
require('babel-core/register');

// Files to process
var TEST_FILES = 'test/**/*Spec.{jsx,js}';

gulp.task('clean', function () {
  return del(['dist', 'build', 'coverage', 'public']);
});


gulp.task('lint', function(){
  return gulp
    .src(['**/*.{js,jsx}', '!coverage/**', '!node_modules/**', '!public/**', '!test/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  return gulp.src(TEST_FILES, {read: false})
    .pipe(mocha());
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


gulp.task('cover', require('gulp-jsx-coverage').createTask({
  src: ['test/**/*.{js,jsx}', 'src/**/*.{js,jsx}', '!coverage/**', '!node_modules/**', '!public/**', '!webapp/**', '!app.js', '!src/components/App.jsx'],
  istanbul: {
      includeUntested: true,
      preserveComments: true,
      coverageVariable: '__MY_TEST_COVERAGE__',
      exclude: /node_modules|test/
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
