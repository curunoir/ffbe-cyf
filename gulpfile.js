var gulp        = require('gulp');
var sass        = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var debug       = require('gulp-debug');

// Tasks

gulp.task('sass', function () {
    return gulp.src('resources/assets/css-preprocessors/scss/nifty.scss')
        .pipe(debug({title: 'unicorn sass:'}))
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('resources/assets/images/ffbe/global_units/*.png')
        .pipe(debug({title: 'unicorn sprite:'}))
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: '/../img/global_units.png',
            cssName: 'global_units.css',
            cssVarMap : function (sprite) {
                sprite.name = sprite.name.replace(/ /g, '_');
            }
        }));
    //spriteData.img.pipe(gulp.dest('public/img'));
    spriteData.css.pipe(gulp.dest('public/css'));

});

gulp.task('sprite2', function () {
    var spriteData = gulp.src('resources/assets/images/ffbe/global_units/*.png')
        .pipe(debug({title: 'unicorn sprite:'}))
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: 'global_units.png',
            cssName: 'global_units.css',
            cssVarMap : function (sprite) {
                sprite.name = sprite.name.replace(/ /g, '_');
            }
        }));
    spriteData.img.pipe(gulp.dest('public/img/'));
    //spriteData.css.pipe(gulp.dest('public/css'));
});

// Gulp requires a default task to be present
gulp.task('default');