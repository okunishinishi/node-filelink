/**
 * @function _followSymlink
 * @private
 */

"use strict";

var fs = require('fs'),
    path = require('path'),
    async = require('async');

/** @lends _followSymlink */
function _followSymlink(filename, callback) {
    async.waterfall([
        function (callback) {
            fs.lstat(filename, callback);
        },
        function (stat, callback) {
            if (stat.isSymbolicLink()) {
                async.waterfall([
                    function (callback) {
                        fs.readlink(filename, callback);
                    },
                    function (linked, callback) {
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

