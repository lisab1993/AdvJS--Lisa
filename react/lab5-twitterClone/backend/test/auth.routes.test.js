// const { expect } = require("chai");
const { app } = require("../src/server");
const jwt = require('jsonwebtoken')

const validUser = {
  username: "yennefer",
  email: "yennefer@vengerberg.com",
  password: "password123",
  confirmPassword: "password123",
};

const signupUser = async (user = validUser) => {
  return await chai.request(app).post("/auth/signup").send(user);
};

const loginUser = async (user = validUser) => {
  return await chai.request(app).post("/auth/login").send(user);
};

describe("[POST] /auth/signup", () => {
  it("Should allow a valid user to signup", async () => {
    const response = await signupUser();

    expect(response.body.username).to.eq(validUser.username);
    expect(response.body.email).to.exist;
    expect(response.body.password).to.not.exist;
    expect(response.status).to.be.eq(200);
  });

  it("Should not allow non-matching passwords to signup", async () => {
    const response = await signupUser({
      ...validUser,
      username: "fakeuser",
      confirmPassword: undefined,
    });
    expect(response.status).to.eq(400);
    expect(response.body.errors).to.exist;
  });
});

describe("[POST] /auth/login", () => {
  it("Should log in a valid user", async () => {
    const response = await loginUser();
    expect(response.status).to.eq(200);
    expect(response.body.token).to.exist;

    const user = jwt.verify(response.body.token, process.env.SECRET_KEY)
    expect(user.username).to.eq(validUser.username)
    expect(user.password).to.not.exist
  });

  it("Should not allow an invalid username to login", async () => {
      const res = await loginUser({
          ...validUser,
          username: 'doesnotexist'
      })

      expect(res.body.errors).to.exist
      expect(res.body.token).to.not.exist
      expect(res.status).to.eq(401)
  })

  it("Should not allow an invalid password to log in", async() => {
      const res = await loginUser({
          ...validUser,
          password: "nonexistantpassword"
      })

      expect(res.body.errors).to.exist
      expect(res.body.token).to.not.exist
      expect(res.status).to.eq(401)
  })
});


module.exports = {
  signupUser,
  loginUser,
  validUser
}