filelink
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/okunishinishi/node-filelink
[bd_travis_url]: http://travis-ci.org/okunishinishi/node-filelink
[bd_travis_shield_url]: http://img.shields.io/travis/okunishinishi/node-filelink.svg?style=flat
[bd_license_url]: https://github.com/okunishinishi/node-filelink/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-filelink
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-filelink.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-filelink.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/okunishinishi/node-filelink
[bd_gemnasium_shield_url]: https://gemnasium.com/okunishinishi/node-filelink.svg
[bd_npm_url]: http://www.npmjs.org/package/filelink
[bd_npm_shield_url]: http://img.shields.io/npm/v/filelink.svg?style=flat
[bd_bower_badge_url]: https://img.shields.io/bower/v/filelink.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Create file links.

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>


<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/readme/01.Installation.md.hbs" Start -->

<a name="section-doc-readme-01-installation-md"></a>
Installation
-----

```bash
$ npm install filelink --save
```

<!-- Section from "doc/readme/01.Installation.md.hbs" End -->

<!-- Section from "doc/readme/02.Usage.md.hbs" Start -->

<a name="section-doc-readme-02-usage-md"></a>
Usage
---------

Create a relative symlink.

```javascript
var filelink = require('filelink');

filelink('src/foo.js', 'dest/foo-link.js', {
    force: true
}, function (err) {
    /*...*/
});
```



<!-- Section from "doc/readme/02.Usage.md.hbs" End -->

<!-- Section from "doc/readme/03.Options.md.hbs" Start -->

<a name="section-doc-readme-03-options-md"></a>
Opitons
-------

| Key | Description | Default |
| --- | ---- | --- |
| type | Type of link. "symlink" or "link" | "symlink" |
| force | Force to create link. | false |
| mkdirp | Create parent directories. | false |
<!-- Section from "doc/readme/03.Options.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/okunishinishi/node-filelink/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------


<!-- Links End -->
