var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    plumber = require('gulp-plumber'),
    merge = require('merge2');

var tsProject = ts.createProject({
    declaration: true,
    noExternalResolve: true,
    target: "es5"
});
var tspath = 'tsjs/*.ts';
gulp.task('buildts', function () {
    var tsResult = gulp.src(tspath)
        .pipe(plumber())
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('js'));
});
gulp.task('watch', ['buildts'], function () {
    gulp.watch(tspath, ['buildts']);
});