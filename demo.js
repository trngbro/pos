const users = require("./api/v1/models/user")

const user = new users({ name: 'John Doe' });
console.log(user.getUserFullName());
console.log(user.isInformation());