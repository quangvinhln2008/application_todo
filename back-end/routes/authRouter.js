const express = require("express");

const verifySignUp  = require("../middleware/verifySignUp");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post("/signup", [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkDuplicateUserName
  ],
  authController.signup
);

authRouter.post("/signin", authController.signin);

module.exports = authRouter;
