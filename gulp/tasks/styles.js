'use strict';

const gulp = require('gulp');
const config = require('../config').styles;
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const {filesPath, isProduction} = require('./helpers');

gulp.task('styles:compile', function (done) {
    return gulp.src(filesPath(config.path.app, 'scss'))
            .pipe(
                sass(gulpif(isProduction(), config.params.prod, config.params.dev))
                    .on('error', function (error) {
                        console.log(error.formatted);
                    })
                    .on('end', function () {

                    })
            )
            .pipe(gulp.dest(config.path.dist));
});

gulp.task('styles:minify', function(done){
    if (isProduction()) {
        gulp.src(filesPath(config.path.dist, 'css'))
            .pipe(postcss([autoprefixer()]))
            .pipe(gulp.dest(config.path.dist));
    }

    done();
});


gulp.task('styles:build', gulp.series(
   'styles:compile',
    'styles:minify'
));

gulp.task('styles:watch', function () {
   gulp.watch(filesPath(config.path.app, 'scss'), gulp.parallel('scss:build'));
});