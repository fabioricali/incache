<div align="center">
<br/><br/>
<img width="300" src="https://raw.githubusercontent.com/fabioricali/incache/master/extra/logo.png?2" title="incache"/>
<br/><br/>
<br/><br/>
Powerful key/value in-memory storage or on disk to persist some data
<br/><br/>
<a href="https://travis-ci.org/fabioricali/incache" target="_blank"><img src="https://travis-ci.org/fabioricali/incache.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/incache?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/incache/badge.svg?branch=master&2" title="Coverage Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<img src="https://img.shields.io/badge/team-terrons-orange.svg" title="Team Terrons"/>
<br/><br/>
</div>

## What does?
InCache is a module that store any info in memory, it can be used for example for storing **server sessions**, **caching http response** or **sharing singleton object** in your apps.
It also give you the possibility to save data on disk so you can avoid the data loss when the process exit or restart.

## Installation

### Node.js
```
npm install incache --save
```

## Examples

### Basic
```javascript
const InCache = require('incache');
const store = new InCache();

// Create a record with key 'my key'
store.set('my key', 'my value');

// Update 'my key'
store.set('my key', {a: 1, b: 2});

// Get key
store.get('my key');

// Remove 'my key'
store.remove('my key');

// Clear
store.clear();

// Expires after 2 seconds
store.set('my string', 'hello world', {maxAge: 2000});
// Or expires on...
store.set('my string', 'hello world', {expires: '2028-08-22 12:00:00'});
```

### Auto remove expired records
```javascript
const store = new InCache({
    autoRemovePeriod: 2 //checks every 2 seconds
});

store.set('my string', 'hello world', {maxAge: 4000});

setTimeout(()=>{
    console.log(store.count()) //=> 0
}, 6000);
```

### Max cache size
```javascript
const store = new InCache({
    maxRecordNumber: 5
});

store.set('k0', 'v0');
store.set('k1', 'v1');
store.set('k2', 'v2');
store.set('k3', 'v3');
store.set('k4', 'v4');
store.set('k5', 'v5');

console.log(store.count()); //=> 5
console.log(store.has('k0')); //=> false
```

### Load manually
```javascript
const store = new InCache({
    autoLoad: false
});

// This method returns a Promise
store.load('my-path/my-store.json').then(() => {
    console.log('loaded');
}).catch(err => {
    console.log(err);
});
```

### Save on disk
By default this operation is running before the process is terminated
```javascript
const store = new InCache({
    autoSave: true
});
```

Save when data is changed
```javascript
const store = new InCache({
    autoSave: true,
    autoSaveMode: 'timer'
});
```

### Save manually
```javascript
const store = new InCache({
    filePath: 'my-path/my-store.json'
});

store.set('a key', 'a value');

// This method returns a Promise
store.save();

// or specify a path
store.save('a-path/a-file.json').then(()=>{
    console.log('saved');
    store.load('a-path/a-file.json');
}).catch(err => {
    console.log(err);
});
```

### Events
```javascript

// Triggered when a record has been deleted
incache.on('remove', key => {
    console.log(key);
});

// Triggered before create/update
incache.on('beforeSet', (key, value) => {
    console.log(key, value);
    if(foo)
        return false;
});

// Triggered when a record has been created
incache.on('create', (key, record) => {
    console.log(key, record);
});

//Triggered when a record has been updated
incache.on('update', (key, record) => {
    console.log(key, record);
});

//Triggered when the cache is saved on disk
incache.on('save', () => {
    console.log('saved on disk');
});

//Triggered when the cache exceed max size
incache.on('exceed', (diff) => {
    console.log(`exceeded for ${diff}`);
});

//... for more events see the documentation
```

### API
Please see the **<a href="https://github.com/fabioricali/incache/blob/master/api.md">full documentation</a>** for more details.

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