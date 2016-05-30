var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('./source/less/theme.less')
        .pipe(less())
        .pipe(gulp.dest('./public/dist/css/'))
});

gulp.task('watch', function() {
    gulp.watch('./source/less/theme.less', ['less']);
});

gulp.task('game', function() {
    gulp.src('./source/less/game.less')
        .pipe(less())
        .pipe(gulp.dest('./public/stylesheets/'))
});

gulp.task('wgame', function() {
    gulp.watch('./source/less/game.less', ['game']);
});

gulp.task('default', ['less', 'watch']);
