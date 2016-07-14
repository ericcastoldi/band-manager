var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    del = require('del'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),
    browserify = require('browserify'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    envify = require('envify'),
    lrload = require('livereactload');

// Transform all required files with Babel
require('babel-core/register');

// Files to process
var TEST_FILES = 'test/**/*Spec.{jsx,js}';

// Hot reloading in development
var isProd = process.env.NODE_ENV === 'production';

function createBundler(useWatchify) {
  return browserify({
    entries: ['src/components/App.jsx'],
    transform: [ babelify, envify ],
    plugin: isProd || !useWatchify ? [] : [ lrload ],    // no additional configuration is needed
    debug: !isProd,
    fullPaths: !isProd  // for watchify
  });
}

// Default task: clean output directory, deploy and run app watching for changes
gulp.task('default', ['deploy-app', 'watch:server', 'watch:js']);

gulp.task('deploy-app', ['clean'], function(done){
  runSequence('copy-webapp', 'bundle:js', done);
});

gulp.task('watch:server', function() {
  nodemon({ script: 'app.js', ext: 'js', ignore: ['gulpfile.js', 'application.js', 'node_modules/*'] })
    .on('change', function () {})
    .on('restart', function () {
      console.log('Server restarted');
    });
});

gulp.task('watch:js', function() {
  // start JS file watching and rebundling with watchify
  var bundler = createBundler(false);
  var watcher = watchify(bundler);

  function rebundle() {
    gutil.log('Update JavaScript bundle');
    watcher
      .bundle()
      .on('error', gutil.log)
      .pipe(source('application.js'))
      .pipe(buffer())
      .pipe(gulp.dest('public'));
  }

  rebundle();

  return watcher
    .on('error', gutil.log)
    .on('update', rebundle);
});

gulp.task('copy-webapp', function(){
  return gulp.src('webapp/**')
    .pipe(gulp.dest('public'));
});

gulp.task('bundle:js', function() {
  var bundler = createBundler(false);
  bundler
    .bundle()
    .pipe(source('application.js'))
    .pipe(gulp.dest('public'));
});

// Run app: clean output directory, deploy and run app
gulp.task('run-app', ['clean'], function(done){
    runSequence('copy-webapp', 'browserify', 'launch', done);
});

gulp.task('clean', function () {
  return del(['coverage', 'public']);
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
