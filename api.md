<a name="InCache"></a>

## InCache
**Kind**: global class  

* [InCache](#InCache)
    * [new InCache([opts])](#new_InCache_new)
    * [.setConfig([opts])](#InCache+setConfig)
    * [.getConfig()](#InCache+getConfig) ⇒ <code>\*</code>
    * [.set(key, value, [opts])](#InCache+set) ⇒ <code>Object</code>
    * [.bulkSet(records)](#InCache+bulkSet)
    * [.get(key, [onlyValue])](#InCache+get) ⇒ <code>any</code> \| <code>null</code>
    * [.remove(key, [silent], [opts])](#InCache+remove)
    * [.bulkRemove(keys)](#InCache+bulkRemove)
    * [.all()](#InCache+all) ⇒ <code>Array</code>
    * [.expired(key)](#InCache+expired) ⇒ <code>boolean</code>
    * [.clear()](#InCache+clear)
    * [.has(key)](#InCache+has) ⇒ <code>boolean</code>
    * [.onRemoved(callback)](#InCache+onRemoved)
    * [.onCreated(callback)](#InCache+onCreated)
    * [.onUpdated(callback)](#InCache+onUpdated)

<a name="new_InCache_new"></a>

### new InCache([opts])
Set configuration

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
    <td>[opts.save]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>if true saves cache in disk</p>
</td>
    </tr><tr>
    <td>[opts.filePath]</td><td><code>string</code></td><td><code>&quot;.InCache&quot;</code></td><td><p>cache file path</p>
</td>
    </tr><tr>
    <td>[opts.storeName]</td><td><code>string</code></td><td></td><td><p>store name</p>
</td>
    </tr>  </tbody>
</table>

<a name="InCache+setConfig"></a>

### inCache.setConfig([opts])
Set configuration

**Kind**: instance method of [<code>InCache</code>](#InCache)  
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
    <td>[opts.save]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>if true saves cache in disk</p>
</td>
    </tr><tr>
    <td>[opts.filePath]</td><td><code>string</code></td><td><code>&quot;.InCache&quot;</code></td><td><p>cache file path</p>
</td>
    </tr><tr>
    <td>[opts.storeName]</td><td><code>string</code></td><td></td><td><p>store name</p>
</td>
    </tr>  </tbody>
</table>

<a name="InCache+getConfig"></a>

### inCache.getConfig() ⇒ <code>\*</code>
Get configuration

**Kind**: instance method of [<code>InCache</code>](#InCache)  
<a name="InCache+set"></a>

### inCache.set(key, value, [opts]) ⇒ <code>Object</code>
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
    <td>[opts.silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>if true no event will be triggered</p>
</td>
    </tr><tr>
    <td>[opts.life]</td><td><code>number</code></td><td><code>0</code></td><td><p>seconds of life. If 0 not expire.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
InCache.set('my key', 'my value');InCache.set('my object', {a: 1, b: 2});InCache.set('my boolean', true, {life: 2}); // Expires after 2 seconds
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
InCache.bulkSet([     {key: 'my key 1', value: 'my value 1'},     {key: 'my key 2', value: 'my value 2'},     {key: 'my key 3', value: 'my value 3'},     {key: 'my key 4', value: 'my value 4'}]);
```
<a name="InCache+get"></a>

### inCache.get(key, [onlyValue]) ⇒ <code>any</code> \| <code>null</code>
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
InCache.get('my key');
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
InCache.remove('my key');
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
InCache.bulkRemove(['key1', 'key2', 'key3']);
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
InCache.has('my key');
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
    <td>callback</td><td><code><a href="#InCache.onRemoved..removedCallback">removedCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
InCache.onRemoved((key)=>{     console.log('removed', key);});
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
    <td>callback</td><td><code><a href="#InCache.onCreated..createdCallback">createdCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
InCache.onCreated((key, record)=>{     console.log('created', key, record);});
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
    <td>callback</td><td><code><a href="#InCache.onUpdated..updatedCallback">updatedCallback</a></code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
InCache.onUpdated((key, record)=>{     console.log('updated', key, record);});
```
