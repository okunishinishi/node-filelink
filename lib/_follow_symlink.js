/**
 * @function _followSymlink
 * @private
 */

'use strict'

const fs = require('fs')
const path = require('path')

/** @lends _followSymlink */
async function _followSymlink (filename) {
  const stat = await new Promise((resolve, reject) =>
    fs.lstat(filename, (err, stat) => err ? reject(err) : resolve(stat))
  )
  if (stat.isSymbolicLink()) {
    let linked = await new Promise((resolve, reject) =>
      fs.readlink(filename, (err, linked) => err ? reject(err) : resolve(linked))
    )
    linked = path.join(path.dirname(filename), linked)
    return await _followSymlink(linked)
  }
  return filename
}

module.exports = _followSymlink
