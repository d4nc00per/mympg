var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less'),
    spawn = require('child_process').spawn,
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css');

var website = null;

process.on('exit', exit);

function errorLogHandler(msg){
    gutil.log(gutil.colors.red(msg));
    gutil.beep();
}

gulp.task('less', function () {
    gulp.src('./styles/styles.less')
    .pipe(less({
        compress: true
    })).on('error', errorLogHandler)
    .pipe(gulp.dest('./styles'));
});
 
gulp.task('compressjs', function() {
  gulp.src('src/*.js')
    .pipe(concat('mpg.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static'))
});

gulp.task('compresscss', function() {
  return gulp.src('styles/*.css')
    .pipe(concat('mpg.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static'));
});

function exit() {
    if (website !== null) {
        process.kill(website.pid, 'SIGKILL');
        website = null;
    }
}

gulp.task('jekyll', function()
    {
        website = spawn('jekyll.bat', ['build']);
        website.on('error', errorLogHandler);

        website.stdout.on('data', (data) => {
            console.log(data.toString('ascii'));
        });
});

gulp.task('watch', function() {
    gulp.watch("./styles/*.less", ['less']);
    gulp.watch("./styles/*.css", ['compresscss', 'jekyll']);
    gulp.watch("./*.html", ['jekyll']);
    gulp.watch("./scripts/*", ['jekyll']);
    gulp.watch("./img/*", ['jekyll']);
    gulp.watch("./_layouts/*", ['jekyll']);
});

gulp.task(
    'default', 
    [   'less',
        'compresscss',
        'compressjs',
        'jekyll',
        'watch'
    ]);