# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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