<a name="InCache"></a>

## InCache
**Kind**: global class  

* [InCache](#InCache)
    * [new InCache([opts])](#new_InCache_new)
    * _instance_
        * [.setConfig([opts])](#InCache+setConfig)
        * [.getConfig()](#InCache+getConfig) ⇒ <code>\*</code>
        * [.set(key, value, [opts])](#InCache+set) ⇒ [<code>record</code>](#InCache..record)
        * [.bulkSet(records)](#InCache+bulkSet)
        * [.get(key, [onlyValue])](#InCache+get) ⇒ <code>any</code> \| <code>null</code> \| [<code>record</code>](#InCache..record)
        * [.remove(key, [silent], [opts])](#InCache+remove)
        * [.addTo(key, value)](#InCache+addTo) ⇒ [<code>record</code>](#InCache..record)
        * [.prependTo(key, value)](#InCache+prependTo) ⇒ [<code>record</code>](#InCache..record)
        * [.updateIn(key, value, where)](#InCache+updateIn)
        * [.removeFrom(key, where)](#InCache+removeFrom)
        * [.bulkRemove(keys)](#InCache+bulkRemove)
        * [.clean(key)](#InCache+clean)
        * [.all()](#InCache+all) ⇒ <code>Array</code>
        * [.expired(key)](#InCache+expired) ⇒ <code>boolean</code>
        * [.clear()](#InCache+clear)
        * [.has(key)](#InCache+has) ⇒ <code>boolean</code>
        * [.onRemoved(callback)](#InCache+onRemoved)
        * [.onCreated(callback)](#InCache+onCreated)
        * [.onUpdated(callback)](#InCache+onUpdated)
    * _inner_
        * [~record](#InCache..record) : <code>Object</code>
        * [~removedCallback](#InCache..removedCallback) : <code>function</code>
        * [~createdCallback](#InCache..createdCallback) : <code>function</code>
        * [~updatedCallback](#InCache..updatedCallback) : <code>function</code>

<a name="new_InCache_new"></a>

### new InCache([opts])
Create instance

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>configuration object</p>
</td>
    </tr><tr>
    <td>[opts.maxAge]</td><td><code>number</code></td><td><code>0</code></td><td><p>max age in milliseconds. If 0 not expire</p>
</td>
    </tr><tr>
    <td>[opts.expires]</td><td><code>Date</code> | <code>string</code></td><td></td><td><p>a Date for expiration. (overwrites <code>opts.maxAge</code>)</p>
</td>
    </tr><tr>
    <td>[opts.silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>if true no event will be triggered</p>
</td>
    </tr><tr>
    <td>[opts.save]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>if true saves cache in disk. (server only)</p>
</td>
    </tr><tr>
    <td>[opts.filePath]</td><td><code>string</code></td><td><code>&quot;.incache&quot;</code></td><td><p>cache file path</p>
</td>
    </tr><tr>
    <td>[opts.storeName]</td><td><code>string</code></td><td></td><td><p>store name</p>
</td>
    </tr><tr>
    <td>[opts.global]</td><td><code>Object</code></td><td></td><td><p><strong>deprecated:</strong> global record configuration</p>
</td>
    </tr><tr>
    <td>[opts.global.silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p><strong>deprecated:</strong> if true no event will be triggered, use <code>silent</code> instead</p>
</td>
    </tr><tr>
    <td>[opts.global.life]</td><td><code>number</code></td><td><code>0</code></td><td><p><strong>deprecated:</strong> max age in seconds. If 0 not expire, use <code>maxAge</code> instead</p>
</td>
    </tr>  </tbody>
</table>

<a name="InCache+setConfig"></a>

### inCache.setConfig([opts])
Set configuration

**Kind**: instance method of [<code>InCache</code>](#InCache)  
**See**: [constructor](constructor) for further information  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opts]</td><td><code>Object</code></td><td><p>configuration object</p>
</td>
    </tr>  </tbody>
</table>

<a name="InCache+getConfig"></a>

### inCache.getConfig() ⇒ <code>\*</code>
Get configuration

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<a name="InCache+set"></a>

### inCache.set(key, value, [opts]) ⇒ [<code>record</code>](#InCache..record)
Set/update record

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td><td></td><td></td>
    </tr><tr>
    <td>value</td><td><code>any</code></td><td></td><td></td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>options object</p>
</td>
    </tr><tr>
    <td>[opts.silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>if true no event will be triggered. (overwrites global configuration)</p>
</td>
    </tr><tr>
    <td>[opts.maxAge]</td><td><code>number</code></td><td><code>0</code></td><td><p>max age in milliseconds. If 0 not expire. (overwrites global configuration)</p>
</td>
    </tr><tr>
    <td>[opts.expires]</td><td><code>Date</code> | <code>string</code></td><td></td><td><p>a Date for expiration. (overwrites global configuration and <code>opts.maxAge</code>)</p>
</td>
    </tr><tr>
    <td>[opts.life]</td><td><code>number</code></td><td><code>0</code></td><td><p><strong>deprecated:</strong> max age in seconds. If 0 not expire. (overwrites global configuration)</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.set('my key', 'my value');inCache.set('my object', {a: 1, b: 2});inCache.set('my boolean', true, {maxAge: 2000}); // Expires after 2 seconds
```
<a name="InCache+bulkSet"></a>

### inCache.bulkSet(records)
Set/update multiple records. This method not trigger any event.

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>records</td><td><code>array</code></td><td><p>array of object, e.g. [{key: foo1, value: bar1},{key: foo2, value: bar2}]</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.bulkSet([     {key: 'my key 1', value: 'my value 1'},     {key: 'my key 2', value: 'my value 2'},     {key: 'my key 3', value: 'my value 3'},     {key: 'my key 4', value: 'my value 4'}]);
```
<a name="InCache+get"></a>

### inCache.get(key, [onlyValue]) ⇒ <code>any</code> \| <code>null</code> \| [<code>record</code>](#InCache..record)
Get record by key

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td><td></td><td></td>
    </tr><tr>
    <td>[onlyValue]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>if false get InCache record</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.get('my key');
```
<a name="InCache+remove"></a>

### inCache.remove(key, [silent], [opts])
Delete a record

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td><td></td><td></td>
    </tr><tr>
    <td>[silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>if true no event will be triggered</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>optional arguments</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.remove('my key');
```
<a name="InCache+addTo"></a>

### inCache.addTo(key, value) ⇒ [<code>record</code>](#InCache..record)
Given a key that has value like an array adds value to end of array

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td>
    </tr><tr>
    <td>value</td><td><code>any</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.set('myArray', ['hello', 'world']);inCache.addTo('myArray', 'ciao'); //-> ['hello', 'world', 'ciao'];
```
<a name="InCache+prependTo"></a>

### inCache.prependTo(key, value) ⇒ [<code>record</code>](#InCache..record)
Given a key that has value like an array adds value to beginning of array

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td>
    </tr><tr>
    <td>value</td><td><code>any</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.set('myArray', ['hello', 'world']);inCache.prependTo('myArray', 'ciao'); //-> ['ciao', 'hello', 'world'];
```
<a name="InCache+updateIn"></a>

### inCache.updateIn(key, value, where)
Given a key that has value like an array updates key(s) if `where` is satisfied

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td>
    </tr><tr>
    <td>value</td><td><code>any</code></td>
    </tr><tr>
    <td>where</td><td><code>any</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.set('myArray', ['hello', 'world']);inCache.updateIn('myArray', 'ciao', 'hello'); //-> ['ciao', 'world'];inCache.set('myArray', [{a: 1, b: 2, c: 3], {b: 2, c: 3}, {b: 4, e: 5});inCache.updateIn('myArray', {z: 0, x: 0}, {b: 2, c: 3}); //-> [{z: 0, x: 0}, {z: 0, x: 0}, {b: 4, e: 5}];
```
<a name="InCache+removeFrom"></a>

### inCache.removeFrom(key, where)
Given a key that has value like an array removes key(s) if `where` is satisfied

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td>
    </tr><tr>
    <td>where</td><td><code>any</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.set('myArray', ['hello', 'world']);inCache.removeFrom('myArray', 'hello'); //-> ['world'];
```
<a name="InCache+bulkRemove"></a>

### inCache.bulkRemove(keys)
Delete multiple records

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>keys</td><td><code>array</code></td><td><p>an array of keys</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.bulkRemove(['key1', 'key2', 'key3']);
```
<a name="InCache+clean"></a>

### inCache.clean(key)
Delete multiple records that contain the passed keyword

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>string</code></td><td><p>a string that is relative to a group of keys</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.set('/api/users/foo', 'Mario Rossi');inCache.set('/api/users/bar', 'Antonio Bianchi');inCache.clean('/api/users');
```
<a name="InCache+all"></a>

### inCache.all() ⇒ <code>Array</code>
Fetch all records

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<a name="InCache+expired"></a>

### inCache.expired(key) ⇒ <code>boolean</code>
Check if record is expired

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td>
    </tr>  </tbody>
</table>

<a name="InCache+clear"></a>

### inCache.clear()
Remove all records

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<a name="InCache+has"></a>

### inCache.has(key) ⇒ <code>boolean</code>
Check if key exists

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>any</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.has('my key');
```
<a name="InCache+onRemoved"></a>

### inCache.onRemoved(callback)
Triggered when a record has been deleted

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#InCache..removedCallback">removedCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.onRemoved((key)=>{     console.log('removed', key);});
```
<a name="InCache+onCreated"></a>

### inCache.onCreated(callback)
Triggered when a record has been created

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#InCache..createdCallback">createdCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.onCreated((key, record)=>{     console.log('created', key, record);});
```
<a name="InCache+onUpdated"></a>

### inCache.onUpdated(callback)
Triggered when a record has been updated

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#InCache..updatedCallback">updatedCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
inCache.onUpdated((key, record)=>{     console.log('updated', key, record);});
```
<a name="InCache..record"></a>

### InCache~record : <code>Object</code>
InCache record

**Kind**: inner typedef of [<code>InCache</code>](#InCache)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>isNew</td><td><code>boolean</code></td><td><p>indicates if is a new record</p>
</td>
    </tr><tr>
    <td>createdOn</td><td><code>Date</code> | <code>null</code></td><td><p>creation date</p>
</td>
    </tr><tr>
    <td>updatedOn</td><td><code>Date</code> | <code>null</code></td><td><p>update date</p>
</td>
    </tr><tr>
    <td>expiresOn</td><td><code>Date</code> | <code>null</code></td><td><p>expiry date</p>
</td>
    </tr><tr>
    <td>value</td><td><code>any</code></td><td><p>record value</p>
</td>
    </tr>  </tbody>
</table>

<a name="InCache..removedCallback"></a>

### InCache~removedCallback : <code>function</code>
onRemoved callback

**Kind**: inner typedef of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>string</code></td><td><p>key of record removed</p>
</td>
    </tr>  </tbody>
</table>

<a name="InCache..createdCallback"></a>

### InCache~createdCallback : <code>function</code>
onCreated callback

**Kind**: inner typedef of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>string</code></td><td><p>key of record created</p>
</td>
    </tr><tr>
    <td>record</td><td><code><a href="#InCache..record">record</a></code></td><td><p>record object</p>
</td>
    </tr>  </tbody>
</table>

<a name="InCache..updatedCallback"></a>

### InCache~updatedCallback : <code>function</code>
onUpdated callback

**Kind**: inner typedef of [<code>InCache</code>](#InCache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>string</code></td><td><p>key of record updated</p>
</td>
    </tr><tr>
    <td>record</td><td><code><a href="#InCache..record">record</a></code></td><td><p>record object</p>
</td>
    </tr>  </tbody>
</table>

