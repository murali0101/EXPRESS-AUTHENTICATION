const express = require("express");
const connect = require("./configs/db");
const userController=require("./controllers/user.controller")
const User = require("./models/user.model")
const { register, login } = require("./controllers/auth.controller");
const postController= require("./controllers/posts.controller")
const app = express();
app.use(express.json());
const { body, validationResult } = require("express-validator");

app.use("/user", userController);
app.use("/post", postController);
app.post(
  "/register",
  body("name").not().isEmpty().withMessage("Please Enter Your Name"),

  body("email")
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Email")
    .isEmail()
    .custom(async (val) => {
      const mail = await User.findOne({ email: val }).lean().exec();
      if (mail) {
        throw new Error("Email Already Register");
      }
    }),
  body("password").not().isEmpty().withMessage("Please Enter Password"),
  register
);
app.post(
  "/login",
  body("email")
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Email")
    .isEmail()
    .withMessage("Please Enter Your Email Correctly"),
  body("password").not().isEmpty().withMessage("Please Enter Password"),

  login
);
app.listen(6800, async () => {
  try {
    await connect();
    console.log("listening port 6800...")
  } catch (error) {
    console.log("error:", error);
  }
});
