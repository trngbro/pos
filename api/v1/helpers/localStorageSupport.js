const localStorage = require('localStorage');

function checkItemExist(itemName, type){
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    if(!type)
        return localStorage.getItem(itemName) ? true : false;
    else{
        var lc_user = localStorage.getItem(itemName);
        if (lc_user !== null) 
            return JSON.parse(lc_user.slice(1, -1));
        else return null;
    }
}

function clearItemExist(itemName){
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    var lc_user = localStorage.getItem(itemName);
    if(lc_user != null)
        localStorage.clear()
}

module.exports = {
    checkItemExist,
    clearItemExist
}