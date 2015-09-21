/**
 * @function _cleanDest
 * @private
 */

"use strict";

var async = require('async'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    filedel = require('filedel');

/** @lends _cleanDest */
function _cleanDest(filename, callback) {
    fs.exists(filename, function (exists) {
        if (!exists) {
            callback(null);
            return;
        }
        async.waterfall([
            function (callback) {
                fs.stat(filename, callback);
            },
            function (stat, callback) {
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
