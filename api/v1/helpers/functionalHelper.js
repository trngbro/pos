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
    }
};