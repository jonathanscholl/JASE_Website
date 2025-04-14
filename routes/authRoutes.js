import express from "express";
import {
  showLogin,
  showSignup,
  handleLogin,
  handleSignup,
  handleLogout,
  showProfile,
}from "../controllers/authController.js"

const authRouter = express.Router();

authRouter.get("/login", showLogin);
authRouter.get("/signup", showSignup);


authRouter.post("/login", handleLogin);
authRouter.post("/signup", handleSignup);
authRouter.post("/logout", handleLogout);


authRouter.get("/profile", showProfile);

export default authRouter;
