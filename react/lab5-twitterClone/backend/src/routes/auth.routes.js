const { AsyncRouter: Router } = require("express-async-router");
const jwt = require('jsonwebtoken')

const User = require("../models/User");
const { loginValidator, signupValidator } = require("../helpers/validators");
const handleValidationErrors = require("../helpers/handleValidatorErrors");

const router = Router();

//signup
router.post(
  "/signup",
  [...signupValidator, handleValidationErrors],
  async (req, res) => {
    const { username, password, email } = req.body;

    const userExists = await User.findOne({ username: username });

    if (userExists) {
      return res.status(400).send({ errors: ["username already in use"] });
    }
    const user = await User.signup(username, password, email);
    //calling the signup method from models
    res.send(user.sanitize());
  }
);

router.post(
  "/login",
  [...loginValidator, handleValidationErrors],
  async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !user.comparePasswords(password)) {
      return res.status(401).send({ errors: ["Invalid username or password"] });
    }
    const token = jwt.sign(user.sanitize(), process.env.SECRET_KEY)

    res.send({token: token});
  }
);

module.exports = router;
