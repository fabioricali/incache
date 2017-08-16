<a name="incache"></a>

## incache : <code>object</code>
**Kind**: global namespace  

* [incache](#incache) : <code>object</code>
    * [.setConfig(opts)](#incache.setConfig)
    * [.getConfig()](#incache.getConfig) ⇒ <code>\*</code>
    * [.set(key, value, [opts])](#incache.set) ⇒ <code>Object</code>
    * [.bulkSet(records)](#incache.bulkSet)
    * [.get(key, [onlyValue])](#incache.get) ⇒ <code>any</code> \| <code>null</code>
    * [.remove(key, [silent], [opts])](#incache.remove)
    * [.bulkRemove(keys)](#incache.bulkRemove)
    * [.all()](#incache.all) ⇒ <code>Array</code>
    * [.expired(key)](#incache.expired) ⇒ <code>boolean</code>
    * [.clear()](#incache.clear)
    * [.has(key)](#incache.has) ⇒ <code>boolean</code>
    * [.onRemoved(callback)](#incache.onRemoved)
        * [~removedCallback](#incache.onRemoved..removedCallback) : <code>function</code>
    * [.onCreated(callback)](#incache.onCreated)
        * [~createdCallback](#incache.onCreated..createdCallback) : <code>function</code>
    * [.onUpdated(callback)](#incache.onUpdated)
        * [~updatedCallback](#incache.onUpdated..updatedCallback) : <code>function</code>

<a name="incache.setConfig"></a>

### incache.setConfig(opts)
Set configuration

**Kind**: static method of [<code>incache</code>](#incache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>opts</td><td><code>Object</code></td><td></td><td><p>configuration object</p>
</td>
    </tr><tr>
    <td>opts.save</td><td><code>boolean</code></td><td><code>true</code></td><td><p>if true saves cache in disk</p>
</td>
    </tr><tr>
    <td>opts.filePath</td><td><code>string</code></td><td><code>&quot;.incache&quot;</code></td><td><p>cache file path</p>
</td>
    </tr><tr>
    <td>opts.storeName</td><td><code>string</code></td><td></td><td><p>store name</p>
</td>
    </tr>  </tbody>
</table>

<a name="incache.getConfig"></a>

### incache.getConfig() ⇒ <code>\*</code>
Get configuration

**Kind**: static method of [<code>incache</code>](#incache)  
<a name="incache.set"></a>

### incache.set(key, value, [opts]) ⇒ <code>Object</code>
Set/update record

**Kind**: static method of [<code>incache</code>](#incache)  
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
    <td>[opts.silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>if true no event will be triggered</p>
</td>
    </tr><tr>
    <td>[opts.life]</td><td><code>number</code></td><td><code>0</code></td><td><p>seconds of life. If 0 not expire.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
incache.set('my key', 'my value');incache.set('my object', {a: 1, b: 2});incache.set('my boolean', true, {life: 2}); // Expires after 2 seconds
```
<a name="incache.bulkSet"></a>

### incache.bulkSet(records)
Set/update multiple records. This method not trigger any event.

**Kind**: static method of [<code>incache</code>](#incache)  
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
incache.bulkSet([     {key: 'my key 1', value: 'my value 1'},     {key: 'my key 2', value: 'my value 2'},     {key: 'my key 3', value: 'my value 3'},     {key: 'my key 4', value: 'my value 4'}]);
```
<a name="incache.get"></a>

### incache.get(key, [onlyValue]) ⇒ <code>any</code> \| <code>null</code>
Get record by key

**Kind**: static method of [<code>incache</code>](#incache)  
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
    <td>[onlyValue]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>if false get incache record</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
incache.get('my key');
```
<a name="incache.remove"></a>

### incache.remove(key, [silent], [opts])
Delete a record

**Kind**: static method of [<code>incache</code>](#incache)  
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
incache.remove('my key');
```
<a name="incache.bulkRemove"></a>

### incache.bulkRemove(keys)
Delete multiple records

**Kind**: static method of [<code>incache</code>](#incache)  
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
incache.bulkRemove(['key1', 'key2', 'key3']);
```
<a name="incache.all"></a>

### incache.all() ⇒ <code>Array</code>
Fetch all records

**Kind**: static method of [<code>incache</code>](#incache)  
<a name="incache.expired"></a>

### incache.expired(key) ⇒ <code>boolean</code>
Check if record is expired

**Kind**: static method of [<code>incache</code>](#incache)  
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

<a name="incache.clear"></a>

### incache.clear()
Remove all records

**Kind**: static method of [<code>incache</code>](#incache)  
<a name="incache.has"></a>

### incache.has(key) ⇒ <code>boolean</code>
Check if key exists

**Kind**: static method of [<code>incache</code>](#incache)  
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
incache.has('my key');
```
<a name="incache.onRemoved"></a>

### incache.onRemoved(callback)
Triggered when a record has been deleted

**Kind**: static method of [<code>incache</code>](#incache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#incache.onRemoved..removedCallback">removedCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
incache.onRemoved((key)=>{     console.log('removed', key);});
```
<a name="incache.onRemoved..removedCallback"></a>

#### onRemoved~removedCallback : <code>function</code>
onRemoved callback

**Kind**: inner typedef of [<code>onRemoved</code>](#incache.onRemoved)  
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

<a name="incache.onCreated"></a>

### incache.onCreated(callback)
Triggered when a record has been created

**Kind**: static method of [<code>incache</code>](#incache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#incache.onCreated..createdCallback">createdCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
incache.onCreated((key, record)=>{     console.log('created', key, record);});
```
<a name="incache.onCreated..createdCallback"></a>

#### onCreated~createdCallback : <code>function</code>
onCreated callback

**Kind**: inner typedef of [<code>onCreated</code>](#incache.onCreated)  
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
    <td>record</td><td><code>Object</code></td><td><p>record object</p>
</td>
    </tr>  </tbody>
</table>

<a name="incache.onUpdated"></a>

### incache.onUpdated(callback)
Triggered when a record has been updated

**Kind**: static method of [<code>incache</code>](#incache)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code><a href="#incache.onUpdated..updatedCallback">updatedCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
incache.onUpdated((key, record)=>{     console.log('updated', key, record);});
```
<a name="incache.onUpdated..updatedCallback"></a>

#### onUpdated~updatedCallback : <code>function</code>
onUpdated callback

**Kind**: inner typedef of [<code>onUpdated</code>](#incache.onUpdated)  
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
    <td>record</td><td><code>Object</code></td><td><p>record object</p>
</td>
    </tr>  </tbody>
</table>

