'use strict';

const nodePath = require('path');

module.exports = {
    resolve: function (dir) {
        return nodePath.join(__dirname, '..', dir);
    },
    assetsPath: function (path) {
        const assetsSubDirectory = 'static';
        return nodePath.posix.join(assetsSubDirectory, path);
    }
};
