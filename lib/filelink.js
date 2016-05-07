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

'use strict'

const fs = require('fs')
const co = require('co')
const argx = require('argx')
const path = require('path')
const mkdirp = require('mkdirp')
const _cleanDest = require('./_clean_dest')
const _followSymlink = require('./_follow_symlink')

/** @lends filelink */
function filelink (src, dest, options) {
  let args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('Callback is no more supported. Use promise interface instead')
  }
  options = args.pop('object') || {}

  let cwd = options.cwd || process.cwd()
  src = path.resolve(cwd, args.shift('string'))
  dest = path.resolve(cwd, args.shift('string'))

  let type = options.type || 'symlink'
  let force = !!options.force
  let destDir = path.dirname(dest);

  return co(function * () {
    src = yield _followSymlink(src)
    if (options.mkdirp) {
      yield new Promise((resolve, reject) =>
        mkdirp(destDir, (err) => err ? reject(err) : resolve())
      )
    } else {
      let exists = yield new Promise((resolve) =>
        fs.exists(destDir, (exists) => resolve(exists))
      )
      if (!exists) {
        throw new Error(`Directory not exists: ${destDir}`)
      }
    }
    if (force) {
      yield _cleanDest(dest)
    }
    let srcName = path.relative(destDir, src)
    let destName = path.relative(destDir, dest)

    process.chdir(destDir)
    yield _doLinkSync(srcName, destName, type)
    process.chdir(cwd)

    yield new Promise((resolve) => process.nextTick(() => resolve()))
  })
}

module.exports = filelink

function _doLinkSync (src, dest, type) {
  return co(function * () {
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
  })
}
