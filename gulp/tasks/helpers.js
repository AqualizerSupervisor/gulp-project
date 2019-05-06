const gulp = require('gulp');
const argv = require('yargs').argv;

module.exports = {
    filesPath: function (path, extension) {
        return path + '**/*.' + extension;
    },
    isProduction: function() {
        return argv.prod || false;
    }
};