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

const fs = require('fs'),
    async = require('async'),
    argx = require('argx'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    _cleanDest = require('./_clean_dest'),
    _followSymlink = require('./_follow_symlink');

/** @lends filelink */
function filelink(src, dest, options, callback) {
    let args = argx(arguments);
    callback = args.pop('function');
    options = args.pop('object') || {};

    let cwd = options.cwd || process.cwd();
    src = path.resolve(cwd, args.shift('string'));
    dest = path.resolve(cwd, args.shift('string'));

    let type = options.type || 'symlink',
        force = !!options.force,
        destDir = path.dirname(dest);

    async.waterfall([
        (callback) => {
            _followSymlink(src, callback);
        },
        (src, callback) => {
            async.series([
                (callback) => {
                    if (options.mkdirp) {
                        mkdirp(destDir, callback);
                    } else {
                        fs.exists(destDir, (exists) => {
                            let err = exists ? null : new Error('Directory not exists: ' + destDir);
                            callback(err);
                        });
                    }
                },
                (callback) => {
                    if (force) {
                        _cleanDest(dest, callback);
                    } else {
                        callback(null);
                    }
                },
                (callback) => {
                    let srcName = path.relative(destDir, src),
                        destName = path.relative(destDir, dest);

                    process.chdir(destDir);

                    try {
                        _doLinkSync(srcName, destName, type);
                        callback(null);
                    } catch (e) {
                        callback(e);
                    }
                }
            ], (err) => {
                process.chdir(cwd);
                process.nextTick(() => {
                    callback(err);
                });
            });
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
