const express = require("express");
const connect = require("./configs/db");
const userController=require("./controllers/user.controller")
const register = require ("./controllers/auth.controller")
const app = express();
app.use(express.json());

app.use("/user", userController);
app.post("/register", register);
app.listen(6800, async () => {
  try {
    await connect();
    console.log("listening port 6800...")
  } catch (error) {
    console.log("error:", error);
  }
});
