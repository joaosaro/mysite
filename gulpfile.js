//Modules
var gulp      = require('gulp'),
    pug       = require('gulp-pug'),
    sass      = require('gulp-sass'),
    prefix    = require('gulp-autoprefixer'),
    uglify    = require('gulp-uglify'),
    plumber   = require('gulp-plumber'),
    del       = require('del');

//Folders Paths
var src       = '_dev/',
    build     = '_site/';

//Data files with json
//Json Files
var data = {
    //Pages
    "home"      : require('./' + src + 'data/home.json')
};

// HTML - with pug
gulp.task('pages', function buildHTML(){
    return gulp.src(src + 'pug/pages/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
      locals: {
        "_data" : data
      }
    }))
    .pipe(gulp.dest(build))
})

// Styles CSS - with sass & autoprefixer
gulp.task('styles', function(){
    return sass(src + 'assets/sass/main.scss', {
      style: 'compressed'})
      .pipe(plumber())
      .pipe(prefix(['last 15 versions', '> 1%']))
      .pipe(gulp.dest(src + '/assets/min/css/'));
});

// JS Uglifier
gulp.task('scripts', function (cb) {
    return gulp.src(src + 'assets/js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(src + 'assets/min/js/'));
});

//Delete task
gulp.task('del', function(done) {
  var minifiedFolder = src + 'assets/min/';
  del(build, done);
  return del(minifiedFolder, done);
});

//Copy SVG Images
gulp.task('gifsvg', function() {
   gulp.src(src + 'assets/images/**/*.{svg,gif}')
   .pipe(gulp.dest(build + 'assets/images'));
});

//Copy Images [Dev -> Prod]
gulp.task('images', function() {
   gulp.src(src + 'assets/min/img/**/*')
   .pipe(gulp.dest(build + 'assets/images'));
});

//Copy other static files
gulp.task('statics', function() {
   gulp.src(src + 'statics/**/*')
   .pipe(gulp.dest(build));
});

//Watch task
gulp.task('watch', function() {
    gulp.watch(src + 'pug/**/*', ['pages']);
    gulp.watch(src + 'assets/min/**/*', ['pages']);
    gulp.watch(src + 'assets/sass/**/*', ['styles']);
    gulp.watch(src + 'assets/js/**/*', ['scripts']);
    gulp.watch(src + 'assets/img/**/*.{svg,gif}', ['gifsvg']);
    gulp.watch(src + 'assets/min/img/**/*', ['images']);
    gulp.watch(src + 'statics/**/*', ['statics']);
})

//Gulp main task
gulp.task('default', function() {
    gulp.start([
        'styles',
        'scripts',
        'pages',
        'images',
        'gifsvg',
        'statics',
        'watch'
    ]);
});

gulp.task('deploy', function() {
  gulp.start([
      'styles',
      'scripts',
      'pages',
      'images',
      'gifsvg',
      'statics'
  ]);
});
