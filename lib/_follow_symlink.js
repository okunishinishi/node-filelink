/**
 * @function _followSymlink
 * @private
 */

"use strict";

const fs = require('fs'),
    path = require('path'),
    async = require('async');

/** @lends _followSymlink */
function _followSymlink(filename, callback) {
    async.waterfall([
        (callback) => {
            fs.lstat(filename, callback);
        },
        (stat, callback) => {
            if (stat.isSymbolicLink()) {
                async.waterfall([
                    (callback) => {
                        fs.readlink(filename, callback);
                    },
                    (linked, callback) => {
                        linked = path.join(path.dirname(filename, linked));
                        _followSymlink(linked, callback);
                    }
                ])
            } else {
                callback(null, filename);
            }
        }
    ], callback);
}

module.exports = _followSymlink;

