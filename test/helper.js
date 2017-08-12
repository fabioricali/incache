const helper = require('../src/helper');
const be = require('bejs');

describe('helper', function () {

    describe('is', function () {
        it('should be return true', () => {
            let result = helper.is('hello', 'string');
            console.log(result);
            be.err.true(result);
        });
        it('should be return false', () => {
            let result = helper.is([], 'string');
            console.log(result);
            be.err.false(result);
        });
    });

    describe('defaults', function () {
        it('should be return true', () => {
            let result = helper.defaults({a: 4, b: 5}, {a: 1, b: 2, c: 3});
            console.log(result);
            be.err.equal(result, {a: 4, b: 5, c: 3});
        });
        it('should be return false', () => {
            let result = helper.defaults({a: 4, b: 5}, {a: 1, b: 2, c: 3});
            console.log(result);
            be.err.not.equal(result, {a: 4, b: 5});
        });
    });

    describe('defaults, deep', function () {
        it('should be return true', () => {
            let result = helper.defaults({a: 4, b: 5, d: {a: 1}}, {a: 1, b: 2, c: 3, d: {a: 5, b: 2}});
            console.log(result);
            be.err.equal(result, {a: 4, b: 5, c: 3, d: {a: 1, b: 2}});
        });
    });

});