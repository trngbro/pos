module.exports = {
    formatCurrency: function (value) {
        if (typeof value === 'string') {
            value = parseFloat(value);
        }
        if (typeof value === 'number') {
            return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        } else {
            return value;
        }
    },

    getStaffNameFromSalerData: function (value) {
        if (typeof value === 'string') {
            return value.split("<<>>")[0];;
        }
        return "name";
    },

    toUnicodeEscapedString: function(inputString){
        return inputString.split('').map(char => {
            const unicodeValue = char.charCodeAt(0).toString(16).toUpperCase();
            return `\\u${'0'.repeat(4 - unicodeValue.length)}${unicodeValue}`;
        }).join('');
    },

    fromUnicodeEscapedString: function(unicodeEscapedString){
        return unicodeEscapedString.replace(/\\u[\dA-Fa-f]{4}/g, match => {
            const unicodeValue = parseInt(match.substr(2), 16);
            return String.fromCharCode(unicodeValue);
        });
    }
};