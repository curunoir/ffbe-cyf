var gulp = require('gulp');
var sass = require('gulp-sass');

// Tasks

gulp.task('sass', function () {
    return gulp.src('resources/assets/css-preprocessors/scss/nifty.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});