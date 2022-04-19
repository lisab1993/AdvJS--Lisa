process.env.ENV = "test";
const mongoose = require("mongoose");
//doesn't have to be ENV, can be named anything

const mocha = require("mocha");
//just by having mocha imported, we get access to the mocha functions
const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, connectDB } = require("../server");
const { deleteOne } = require("../models/User");

//say npm run test to get it to work
//in package.json, the test was changed.
chai.use(chaiHttp);

//settimeout is a workaround for before and after not being allowed in the global scope
setTimeout(() => {
  before(async () => {
    await connectDB("/testdb");
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});

describe("general route testing", () => {
  it("should return a 200 status code", async () => {
    const response = await chai.request(app).get("/board/");
    //the test expects the response to be 200; make it englishy for non-coders
    chai.expect(response.status).to.be.eq(200);
  });

  //purposely testing a bad route that doesn't exist; it returned the 404 status code as expected
  it("should return a 404 status code", async () => {
    const response = await chai.request(app).get("/heatherkitty/");

    chai.expect(response.status).to.be.eq(404);
  });
});

describe("auth", () => {
  it("should allow a valid user to sign up", async () => {
    const response = await chai.request(app).post("/auth/signup").send({
      username: "pink",
      password: "pink",
      passwordCheck: "pink",
    });
    chai.expect(response.body.username).exist;
    chai.expect(response.status).to.be.eq(200);
  });

  it("should allow a user to log in with a valid username and password", async function () {
    const response = await chai.request(app).post("/auth/login").send({
      username: "pink",
      password: "pink",
    });

    //to use the this keyword, use a regular function instead of arrow notation
    this.token = response.body.token;

    chai.expect(response.body.token).exist;
    chai.expect(response.status).to.be.eq(200);
  });
});
