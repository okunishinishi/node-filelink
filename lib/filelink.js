/**
 * @file Link files.
 * @function filelink
 * @param {string} src - Source file (actual file) path.
 * @param {string} dest - Destination file (link) path.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.type='symlink'] - Link type
 * @param {boolean} [options.mkdirp] - Make parent directories.
 * @param {boolean} [options.force] - Force to symlink or not.
 * @param {function} callback - Callback when done.
 */

"use strict";

var fs = require('fs'),
    async = require('async'),
    argx = require('argx'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    _cleanDest = require('./_clean_dest'),
    _followSymlink = require('./_follow_symlink');

/** @lends filelink */
function filelink(src, dest, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function');
    options = args.pop('object') || {};

    var cwd = options.cwd || process.cwd();
    src = path.resolve(cwd, args.shift('string'));
    dest = path.resolve(cwd, args.shift('string'));

    var type = options.type || 'symlink';

    var force = !!options.force;

    var destDir = path.dirname(dest);
    async.waterfall([
        function (callback) {
            _followSymlink(src, callback);
        },
        function (src, callback) {
            async.series([
                function (callback) {
                    if (options.mkdirp) {
                        mkdirp(destDir, callback);
                    } else {
                        fs.exists(destDir, function (exists) {
                            var err = exists ? null : new Error('Directory not exists: ' + destDir);
                            callback(err);
                        });
                    }
                },
                function (callback) {
                    if (force) {
                        _cleanDest(dest, callback);
                    } else {
                        callback(null);
                    }
                },
                function (callback) {
                    var srcName = path.relative(destDir, src),
                        destName = path.relative(destDir, dest);

                    process.chdir(destDir);

                    try {
                        _doLinkSync(srcName, destName, type);
                        callback(null);
                    } catch (e) {
                        callback(e);
                    } finally {
                        process.chdir(cwd);
                    }
                }
            ], callback);
        }
    ], callback);
}

module.exports = filelink;

function _doLinkSync(src, dest, type) {
    switch (type) {
        case 'link':
            fs.linkSync(src, dest);
            break;
        case 'symlink':
            fs.symlinkSync(src, dest);
            break;
        default:
            throw new Error('Unknown type:' + type)
    }
}
