var gulp = require('gulp'),
        less = require('gulp-less');

gulp.task('less',function(){
    gulp.src('./source/less/theme.less')
    .pipe(less())
    .pipe(gulp.dest('./public/dist/css/'))
    });

gulp.task('watch',function(){
    gulp.watch('./source/less/theme.less',['less']);
    });

gulp.task('default',['less','watch']);