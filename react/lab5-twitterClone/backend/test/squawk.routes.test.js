
const { app } = require("../src/server");

const { signupUser, loginUser, validUser } = require("./auth.routes.test");

const createSquawk = async (body, token) => {
  return await chai
    .request(app)
    .post("/squawk/")
    .send(body)
    .set("Authorization", `Bearer ${token}`);
};

//CREATE
describe("[POST] /squawk/", async () => {
  before(async () => {
    const response = await loginUser(validUser);
    this.token = response.body.token;
  });

  it("Should create a squawk", async () => {
    const res = await createSquawk("Cintra", this.token);
    console.log(res.body, 'res.body1')
    expect(res.body.body).to.eq("Cintra");
    expect(res.status).to.eq(201);
  });

  it("Should not create a squawk with an empty body", async () => {
    const res = await createSquawk("", this.token);

    expect(res.body.errors).to.exist;
    expect(res.body.body).to.not.exist;
    expect(res.status).to.eq(400);
  });

  it("Should not create a squawk without a user", async () => {
    const res = await createSquawk("griffins", undefined);

    expect(res.body.errors).to.exist;
    expect(res.body.body).to.not.exist;
    expect(res.status).to.eq(403);
  });
});
