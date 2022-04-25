const chai = require("chai");
const dotenv = require("dotenv");

const { app } = require("../server");
dotenv.config();

//SIGNUP ROUTES ---------------------------------
describe("/auth/signup authRoutes.js", () => {
  //VALID USER CAN SIGN UP
  it("Should allow a valid user to signup", async () => {
    const res = await chai.request(app).post("/auth/signup").send({
      username: "Geralt of Rivia",
      password: "geraltPass",
      passwordCheck: "geraltPass",
    });
    chai.expect(res.body.username).to.exist;
    chai.expect(res.body.password).to.not.exist;
    chai.expect(res.status).to.be.eq(200);
  });

  //DON'T LET USERS SIGN UP IF PASSWORD DON'T MATCH
  it("Should not allow a user to sign up if their password do not match", async () => {
    const res = await chai.request(app).post("/auth/login").send({
      username: "Yennefer of Vengerberg",
      password: "yenPass",
      passwordCheck: "YenWrongPass",
    });
    chai.expect(res.body.password !== res.body.passwordCheck);
    chai.expect(res.status).to.be.eq(400);
  });

  //DON'T LET USERS SIGN UP IF USERNAME IS TAKEN
  it("Should not allow a user to sign up if the username is taken", async () => {
    const res = await chai.request(app).post("/auth/signup").send({
      username: "Geralt of Rivia",
      password: "geraltPass",
      passwordCheck: "geraltPass",
    });
    chai.expect(res.status).to.be.eq(400);
  });
});

//LOGIN ROUTES --------------------
describe("/auth/login authRoutes.js", () => {
  //VALID USERS CAN LOG IN
  it("Should allow a valid user to login", async () => {
    const res = await chai.request(app).post("/auth/login").send({
      username: "Geralt of Rivia",
      password: "geraltPass",
      passwordCheck: "geraltPass",
    });
    this.token = res.body.token
    chai.expect(res.status).to.be.eq(200);
  });
});

//LOGGED IN USERS CAN VIEW THEIR PROFILE
describe('/auth/profile authRoutes.js', () => {
  it('Should allow a logged in user to view their profile', async() => {
    const res =await chai.request(app).get('/auth/profile').set('Authorization', `Bearer ${this.token}`)

    chai.expect(res.status).to.eq(200)
    chai.expect(res.body.username).to.exist
  })
})