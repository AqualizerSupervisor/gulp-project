'use strict';

const gulp = require('gulp');
const config = require('./gulp/config');
const requireDir = require('require-dir')(config.path.tasks);

gulp.task('build', gulp.parallel(
    'styles:build',
    'scripts:build'
));