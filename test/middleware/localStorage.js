const fn = require("../../api/v1/middlewares/localStorageSupport")

console.log(fn.checkItemExist("user", true))
console.log(fn.checkItemExist("user", false))