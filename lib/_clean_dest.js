/**
 * @function _cleanDest
 * @private
 */

"use strict";

const async = require('async'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    filedel = require('filedel');

/** @lends _cleanDest */
function _cleanDest(filename, callback) {
    fs.exists(filename, (exists) => {
        if (!exists) {
            callback(null);
            return;
        }
        async.waterfall([
            (callback) => {
                fs.stat(filename, callback);
            },
            (stat, callback) => {
                if (stat.isDirectory()) {
                    rimraf(filename, callback);
                } else {
                    filedel(filename, callback);
                }
            }
        ], callback);
    });
}

module.exports = _cleanDest;
