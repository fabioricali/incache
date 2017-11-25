# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [6.6.0] - 2017-11-25
- Added
    - methods
        - `suspendEvent`
        - `resumeEvent`
        - `suspendEvents`
        - `resumeEvents`

## [6.5.1] - 2017-11-19
- Added
    - static method `isRecord`
    - UMD support
- Changed
    - `bulkSet` now accepts custom array     

## [6.4.0] - 2017-10-14
- Improvement for `InCache` instance and `on` method, now are chainable
- Added 
    - events
        - `beforeLoad`
        - `beforeSave`
    - instance parameter to events
        - `load`
        - `save`
- Bug fix            

## [6.3.0] - 2017-09-30
- Added 
    - record property 
        - `hits`
        - `lastHit`
    - `stats` method

## [6.2.0] - 2017-09-25
- Added
    - path parameter to `load` and `save` methods, now it's possible specify a file path to load or save

## [6.1.1] - 2017-09-24
- Typo fixed

## [6.1.0] - 2017-09-24
- Added
    - events
        - `change`
        - `exceed`

## [6.0.0] - 2017-09-23
- Added
    - options
        - `autoLoad`
        - `autoSave`
        - `autoSaveMode`
        - `autoSavePeriod`
        - `clone`
        - `preserve`
        - `deleteOnExpires`
        - `maxRecordNumber`
    - methods
        - `load()`
        - `save()` 
        - `count()` 
    - events
        - `load`
        - `save`    

## [5.2.0] - 2017-09-06
- **Important:** 
    - changed the default value of `save` option, now is set to "false"
    - changed the default value of `share` option, now is set to "false"

## [5.1.0] - 2017-09-05
- **Important:** changed the default value of `nullIfNotFound` option, now is set to "false"

## [5.0.0] - 2017-09-05
- Added
    - method`on`
    - events:
        - `beforeSet`
        - `set`
        - `create`
        - `update`
        - `beforeRemove`
        - `remove`
        - `beforeBulkSet`
        - `bulkSet`
        - `beforeBulkRemove`
        - `bulkRemove`
        - `expired`
    - options: 
        - `autoRemovePeriod`, now InCache can remove automatically expired records without calling any methods
        - `nullIfNotFound`
- Deprecated methods:
    - `onCreated`
    - `onUpdated`
    - `onRemoved`

## [4.2.1] - 2017-09-01
- Fixed wrong warning message

## [4.2.0] - 2017-09-01
- Added new property to configuration: `share`, now is possible disable global storage

## [4.1.2] - 2017-08-30
- Fixed `record.createdOn` is null, it happened when record was updated

## [4.1.1] - 2017-08-30
- Added `destroy`, alias of `remove`
- Removed unused code

## [4.1.0] - 2017-08-29
- Added new method: `removeExpired`, now is possible remove all records expired at once

## [4.0.2] - 2017-08-22
- Fixed expires: now if set overwrites maxAge

## [4.0.1] - 2017-08-22
- Fixed default configuration

## [4.0.0] - 2017-08-22
- Changed configuration
    - Added new properties
        - `maxAge`
        - `expires`
        - `silent`
    - **Deprecated properties**
        - `global.life`    
        - `global.silent`    

## [3.1.1] - 2017-08-21
- Fixed readme

## [3.1.0] - 2017-08-21
- Added `clean` method

## [3.0.1] - 2017-08-20
- Removed unnecessary files for deployment on NPM

## [3.0.0] - 2017-08-19
- Library loading was changed:
    - **Now you need to instantiate the `new InCache` object**
- Added cache writing to disk
- Added `setConfig` method
- Added `addTo` method
- Added `prependTo` method
- Added `updateIn` method
- Added `removeFrom` method
- Added global record configuration

## [2.0.0] - 2017-08-13
- Changed `set` method: last argument now is an object, see documentation.
- Added expiry date

## [1.0.1] - 2017-08-12
- First release