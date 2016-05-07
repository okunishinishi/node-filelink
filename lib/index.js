/**
 * Create file links.
 * @module filelink
 * @version 2.0.0
 */

'use strict'

const filelink = require('./filelink'),
    pkg = require('../package.json');

let lib = filelink.bind(this);

lib.filelink = filelink;
lib.version = pkg;

module.exports = lib;
