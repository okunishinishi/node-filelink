/**
 * @function _cleanDest
 * @private
 */

'use strict'

const fs = require('fs')
const co = require('co')
const rimraf = require('rimraf')
const filedel = require('filedel')

/** @lends _cleanDest */
function _cleanDest (filename) {
  return co(function * () {

    let exists = yield new Promise((resolve) =>
      fs.exists(filename, (exists) => resolve(exists))
    )
    if (!exists) {
      return
    }
    let stat = yield new Promise((resolve, reject) =>
      fs.stat(filename, (err, stat) =>
        err ? reject(err) : resolve(stat)
      )
    )
    if (stat.isDirectory()) {
      yield new Promise((resolve, reject) =>
        rimraf(filename, (err) => err ? reject(err) : resolve())
      )
    } else {
      yield filedel(filename)
    }
  })
}

module.exports = _cleanDest
