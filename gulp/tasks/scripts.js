'use strict';

const gulp = require('gulp');
const config = require('../config').scripts;
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const {filesPath, isProduction} = require('./helpers');

gulp.task('scripts:concat', function () {
    return gulp.src(filesPath(config.path.app, 'js'))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('scripts:uglify', function (done) {
    if (isProduction()) {
        gulp.src(filesPath(config.path.dist, 'js'))
            .pipe(uglify())
            .pipe(gulp.dest(config.path.dist));
    }

    done();
});

gulp.task('scripts:build', gulp.series(
    'scripts:concat',
    'scripts:uglify'
));

gulp.task('scripts:watch', function () {
    gulp.watch(filesPath(config.path.app, 'js'), gulp.series('scripts:build'));
});


