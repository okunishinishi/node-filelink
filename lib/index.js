/**
 * Create file links.
 * @module filelink
 * @version 1.0.0
 */

"use strict";

var filelink = require('./filelink'),
    pkg = require('../package.json');

var lib = filelink.bind(this);

lib.filelink = filelink;
lib.version = pkg;

module.exports = lib;
