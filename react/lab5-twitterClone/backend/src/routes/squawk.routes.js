const { AsyncRouter: Router } = require("express-async-router");
const jwt = require("jsonwebtoken");

const Squawk = require("../models/Squawk");
const { squawkValidator } = require("../helpers/validators");
const handleValidationErrors = require("../helpers/handleValidatorErrors");
const jwtMiddleware = require("../helpers/jwtMiddleware");

const router = Router();

//Create
router.post("/", [...squawkValidator, handleValidationErrors, jwtMiddleware], async (req, res) => {
  res.send("🌷");
});

module.exports = router;
