const chai = require("chai");
const dotenv = require("dotenv");

const { app } = require("../server");
const { createBoardUser, getBoardToken } = require("./test-helper");
dotenv.config();

describe("/board/ boardRoutes.js", () => {
  //CREATE
  //user must be logged in first.
  it("Should create a new board", async () => {
    this.testingUser = await createBoardUser();
    this.testingToken = await getBoardToken();
    const res = await chai
      .request(app)
      .post("/board/")
      .set("Authorization", `Bearer ${this.testingToken}`)
      .send({
        name: "witcher contracts",
        author: this.testingUser._id,
      });
    this.testingBoard = res.body;

    chai.expect(res.status).to.eq(200);
    chai.expect(res.body.name).to.exist;
  });

  //RETRIEVE
  it("Should retrieve a board by its ID", async () => {
    const res = await chai.request(app).get(`/board/${this.testingBoard._id}`);

    chai.expect(res.status).to.eq(200);
    chai.expect(res.body.name).to.exist;
  });

  //UPDATE
  it("Should update a board by its ID", async () => {
    const res = await chai
      .request(app)
      .patch(`/board/${this.testingBoard._id}`)
      .set("Authorization", `Bearer ${this.testingToken}`)
      .send({
        name: "witcher contracts -updated",
      });

    chai.expect(res.status).to.eq(200);
    chai.expect(res.body.name).to.eq("witcher contracts -updated");
  });

  //DELETE
  it("Should delete a specified board", async () => {
    const res = await chai
      .request(app)
      .delete(`/board/${this.testingBoard._id}`)
      .set("Authorization", `Bearer ${this.testingToken}`);

    chai.expect(res.status).to.eq(200);
  });

  // LIST
  it("Should return all of the boards", async () => {
    const res = await chai.request(app).get("/board/");

    // console.log('\n RES OBJECT', res.body, '\n RES OBJECT')
    chai.expect(res.status).to.be.eq(200);
  });
});
