var filelink = require('filelink');

filelink('src/foo.js', 'dest/foo-link.js', {
    force: true
}, function (err) {
    /*...*/
});