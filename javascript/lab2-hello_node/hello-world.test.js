const {capitalize, speak} = require("./hello-world.js")
const assert = require('assert')

const myName = capitalize('lisa')
console.log(myName)


assert.strictEqual(myName, "Lisa"); // This will pass silently
// assert.strictEqual(myName, "lIsA"); // This will throw an assertion error!