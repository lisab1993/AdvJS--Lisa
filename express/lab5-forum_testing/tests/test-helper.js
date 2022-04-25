const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const dotenv = require("dotenv");

const { connectDB } = require("../server");
const { app } = require("../server");

chai.use(chaiHttp);

setTimeout(() => {
  before(async () => {
    this.database = await connectDB("lisa-test-db");
  });
  after(async () => {
    await this.database.connection.dropDatabase();
    await this.database.connection.close();
  });
});

//USE IN BOARD-TEST.JS
const createBoardUser = async () => {
  //used to create a user for board-test.js
  const res = await chai.request(app).post("/auth/signup").send({
    username: "Cirilla",
    password: "ciriPass",
    passwordCheck: "ciriPass",
  });
  return res.body;
};

const getBoardToken = async () => {
  //get a token for board-test.js
  const res = await chai.request(app).post("/auth/login").send({
    username: "Cirilla",
    password: "ciriPass",
    passwordCheck: "ciriPass",
  });
  return res.body.token;
};

//USE IN POST-TEST.JS
const createPostUser = async () => {
  //create a user for post-test.js
  const res = await chai.request(app).post("/auth/signup").send({
    username: "Dandelion",
    password: "bardPass",
    passwordCheck: "bardPass",
  });
  return res.body;
};

const getPostToken = async () => {
  //get a token for post-test.js
  const res = await chai.request(app).post("/auth/login").send({
    username: "Dandelion",
    password: "bardPass",
    passwordCheck: "bardPass",
  });
  return res.body.token;
};

const createBoard = async (token, authorID) => {
  //create a board to be used in post-test.js
  // console.log(token, 'token in createboard')
  // console.log(authorID, 'author id in createboard')
  const res = await chai
    .request(app)
    .post("/board/")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "gwent board",
      author: authorID,
    });
  return res;
};

module.exports = {
  createBoardUser,
  getBoardToken,
  createBoard,
  createPostUser,
  getPostToken
};
