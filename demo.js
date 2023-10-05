const test = require("./api/v1/helpers/localStorageSupport")

var dt = {
    _id: "123",
    type: "block",
    status: "block"
}

console.log(test.clearUserAndSavedData(dt))
console.log(test.getCurrentUser())