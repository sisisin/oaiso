const gulp = require('gulp');

const staticSrc = ['front/**/*.html', 'front/**/*.css'];
gulp.task('static', () => {
  gulp.src(staticSrc)
    .pipe(gulp.dest('_tmp'))
});

gulp.task('static:w', ['static'], () => {
  gulp.watch(staticSrc, ['static']);
});