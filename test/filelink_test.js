/**
 * Test case for filelink.
 * Runs with mocha.
 */
"use strict";

const filelink = require('../lib/filelink.js'),
    assert = require('assert');

it('Filelink', (done) => {
    filelink(__filename, __dirname + '/../tmp/foo/bar', {
        mkdirp: true,
        force: true
    }, (err) => {
        assert.ifError(err);
        done();
    });
});


it('Link dir', (done) => {
    filelink(__dirname, __dirname + '/../tmp/foo/baz', {
        mkdirp: true,
        force: true
    }, (err) => {
        assert.ifError(err);
        done();
    });
});

