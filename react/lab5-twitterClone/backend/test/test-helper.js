const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const dotenv = require("dotenv");
const path = require("path");
const { connectDatabase } = require("../src/server");
// const { db } = require("../src/models/User");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});
process.env.ENV = 'test'

chai.use(chaiHttp);

//we won't have to import chai into any test files, it's already included with mocha because we made it global
global.chai = chai;
global.expect = chai.expect;

setTimeout(() => {
  before(async () => {
    //global makes the db variable a global one
    global.db = await connectDatabase("test-db");
  });

  after(async () => {
    await db.connection.dropDatabase();
    await db.connection.close();
  });
});
