/**
 * Test case for filelink.
 * Runs with nodeunit.
 */

var filelink = require('../lib/filelink.js');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Filelink'] = function (test) {
    filelink(__filename, __dirname + '/../tmp/foo/bar', {
        mkdirp: true,
        force: true
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};


exports['Link dir'] = function (test) {
    filelink(__dirname, __dirname + '/../tmp/foo/baz', {
        mkdirp: true,
        force: true
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};

