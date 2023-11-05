const assert = require('assert');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;
const { formatCurrency, getStaffNameFromSalerData, toUnicodeEscapedString, fromUnicodeEscapedString, equalStringWithString } = require('../../test/helpers/functionalHelper');

// Kiểm tra hàm formatCurrency
// Kiểm tra hàm formatCurrency
describe('formatCurrency', function () {
    it('should format a number as currency', function () {
        const formattedValue = formatCurrency(1000000);
        expect(formattedValue).to.include('1.000.000');
    });

    it('should convert and format a string as currency', function () {
        const formattedValue = formatCurrency('1500000');
        expect(formattedValue).to.include('1.500.000');
    });

    it('should return the same value if it is not a number or a string', function () {
        const value = { prop: 'value' };
        const result = formatCurrency(value);
        expect(result).to.equal(value);
    });
});


// Kiểm tra hàm getStaffNameFromSalerData
describe('getStaffNameFromSalerData', function () {
    it('should extract staff name from a string with "<<>>"', function () {
        const staffName = getStaffNameFromSalerData('Giang<<>>Nghia');
        assert.strictEqual(staffName, 'Giang');
    });

    it('should return a default value if the input is not a string', function () {
        const result = getStaffNameFromSalerData(12345);
        assert.strictEqual(result, 'name');
    });
});

// Kiểm tra hàm toUnicodeEscapedString và fromUnicodeEscapedString
describe('Unicode Escaped String', function () {
    it('should convert a string to a Unicode-escaped string', function () {
        const escapedString = toUnicodeEscapedString('Hello');
        assert.strictEqual(escapedString.toLowerCase(), '\\u0048\\u0065\\u006c\\u006c\\u006f'.toLowerCase());
    });

    it('should convert a Unicode-escaped string back to the original string', function () {
        const originalString = fromUnicodeEscapedString('\\u0048\\u0065\\u006c\\u006c\\u006f');
        assert.strictEqual(originalString, 'Hello');
    });
});

// Kiểm tra hàm equalStringWithString
describe('equalStringWithString', function () {
    it('should call the true block if two strings are equal', function () {
        const result = equalStringWithString('abc', 'abc', {
            fn: function () {
                return 'true block';
            },
            inverse: function () {
                return 'false block';
            },
        });
        assert.strictEqual(result, 'true block');
    });

    it('should call the false block if two strings are not equal', function () {
        const result = equalStringWithString('abc', 'def', {
            fn: function () {
                return 'true block';
            },
            inverse: function () {
                return 'false block';
            },
        });
        assert.strictEqual(result, 'false block');
    });
});
