const chai = require("chai");
const dotenv = require("dotenv");

const { app } = require("../server");
const { createPostUser, getPostToken, createBoard } = require("./test-helper");
dotenv.config();

describe("/post/ postRoutes.js", () => {
  //CREATE
  //user must be logged in and create a board first
  it("Should create a new post", async () => {
    this.testingUser = await createPostUser();
    this.testingToken = await getPostToken();
    this.testingBoard = await createBoard(
      this.testingToken,
      this.testingUser._id
    );
    const res = await chai
      .request(app)
      .post("/post/")
      .set("Authorization", `Bearer ${this.testingToken}`)
      .send({
        title: "a miraculous guide to gwent",
        body: "up for a round of gwent?",
        author: this.testingUser._id,
        board: this.testingBoard.body._id,
      });
    this.testingPost = res.body;
    chai.expect(res.status).to.eq(200);
    chai.expect(res.body.title).to.eq("a miraculous guide to gwent");
  });

  //RETRIEVE
  it("Should retrieve a post by its ID", async () => {
    const res = await chai.request(app).get(`/post/${this.testingPost._id}`);
    chai.expect(res.status).to.eq(200);
    chai.expect(res.body.title).to.exist;
  });

  //UPDATE
  it("Should update a post by its ID", async () => {
    const res = await chai
      .request(app)
      .patch(`/post/${this.testingPost._id}`)
      .set("Authorization", `Bearer ${this.testingToken}`)
      .send({
        title: "a miraculous guide to gwent -updated",
      });

    chai.expect(res.status).to.eq(200);
    chai.expect(res.body.title).to.eq("a miraculous guide to gwent -updated");
  });

    //DELETE
    it("Should delete a specified post", async () => {
      const res = await chai
        .request(app)
        .delete(`/post/${this.testingPost._id}`)
        .set("Authorization", `Bearer ${this.testingToken}`);

      chai.expect(res.status).to.eq(200);
    });

    // LIST
    it("Should return all of the posts", async () => {
      const res = await chai.request(app).get("/post/");

      // console.log('\n RES OBJECT', res.body, '\n RES OBJECT')
      chai.expect(res.status).to.be.eq(200);
    });
});
