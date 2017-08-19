<div align="center">
<br/><br/>
<img width="268" src="https://raw.githubusercontent.com/fabioricali/incache/master/extra/logo.png?1" title="incache"/>
<br/><br/>
Easy data storing
<br/><br/>
<a href="https://travis-ci.org/fabioricali/incache" target="_blank"><img src="https://travis-ci.org/fabioricali/incache.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/incache?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/incache/badge.svg?branch=master" title="Coverage Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<img src="https://img.shields.io/badge/team-terrons-orange.svg" title="Team Terrons"/>
</div>

## Why?
InCache is a module that store any info in memory, it can be used for example for storing **server sessions**, **caching http response** or **sharing singleton object** in your apps.
It also give you the possibility to save data on disk so you can avoid the data loss when the process exit or restart.

## Installation

### Node.js
```
npm install incache --save
```

## Example
```javascript
const InCache = require('incache');
const store = new InCache();

// Create a record with key 'my key'
store.set('my key', 'my value');

// Update 'my key'
store.set('my key', {a: 1, b: 2});

// Remove 'my key'
store.remove('my key');

// Clear
store.clear();

// Expires after 2 seconds
incache.set('my string', 'hello world', {life: 2});
```

### Events
```javascript

// Triggered when a record has been deleted
incache.onRemoved(key => {
    console.log(key);
});

// Triggered when a record has been created
incache.onCreated((key, record) => {
    console.log(key, record);
});

//Triggered when a record has been updated
incache.onUpdated((key, record) => {
    console.log(key, record);
});
```

### API
See <a href="https://github.com/fabioricali/incache/blob/master/api.md">full documentation</a>

### Browser

#### Local
```html
<script src="node_modules/incache/dist/incache.min.js"></script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/incache/dist/incache.min.js"></script>
```

#### CDN jsDeliver
```html
<script src="https://cdn.jsdelivr.net/npm/incache/dist/incache.min.js"></script>
```

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/incache/blob/master/CHANGELOG.md">here</a>

## License
InCache is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>

## Contributor
<a target="_blank" href="https://www.mdslab.org">Davide Polano</a>