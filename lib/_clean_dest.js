/**
 * @function _cleanDest
 * @private
 */

'use strict'

const {existsAsync, statAsync} = require('asfs')
const rimraf = require('rimraf')
const filedel = require('filedel')

/** @lends _cleanDest */
async function _cleanDest (filename) {
  const exists = await existsAsync(filename)
  if (!exists) {
    return
  }
  const stat = await statAsync(filename)
  if (stat.isDirectory()) {
    await new Promise((resolve, reject) =>
      rimraf(filename, (err) => err ? reject(err) : resolve())
    )
  } else {
    await filedel(filename)
  }
}

module.exports = _cleanDest
