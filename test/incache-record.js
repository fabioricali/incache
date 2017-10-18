const InCache = require('../src/incache');
const be = require('bejs');
const RECORD = {"id":"7ccb17d0-b35b-11e7-82fa-519b6a24f113","isNew":true,"isPreserved":false,"toDelete":true,"hits":0,"lastHit":null,"createdOn":"2017-10-17T16:51:57.517Z","updatedOn":null,"expiresOn":null,"value":"hello"};
const NO_RECORD = {"id":"82c34b20-a236-11e7-8a3b-73666a4a72b6","isNew":true,"isPreserved":false,"toDelete":true,"createdOn":"2017-09-25T21:14:26.386Z","updatedOn":null,"expiresOn":null};

describe('cache-record', function () {
    it('should be return true', () => {
        be.err.true(InCache.isRecord(RECORD));
    });

    it('should be return false', () => {
        be.err.false(InCache.isRecord(NO_RECORD));
    });

    it('should be return false if passing a no object', () => {
        be.err.false(InCache.isRecord(1));
    });

});
