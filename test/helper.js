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

    describe('addSecondsToNow', function () {
        it('should be return true', () => {
            let result = helper.addSecondsToNow(2);
            be.err.true(result > new Date());
        });
    });

    describe('isServer', function () {
        it('should be return true', () => {
            be.err.true(helper.isServer());
        });
    });

    describe('deprecated', function () {
        it('should be return true', () => {
            const result = helper.deprecated('foo()', 'foo() is deprecated');
            be.err.true(result);
        });
        it('only one argument, should be return true', () => {
            const result = helper.deprecated('bar() is deprecated');
            be.err.true(result);
        });
        it('log type, should be return true', () => {
            const result = helper.deprecated(123, 'bar() is deprecated', 'log');
            be.err.true(result);
        });
        it('undefined, should be return false', () => {
            const result = helper.deprecated(undefined, 'bar() is deprecated');
            be.err.false(result);
        });
    });
});