import express from "express";
import {
  showLogin,
  showSignup,
  handleLogin,
  handleSignup,
  handleLogout,
  showProfile,
  handleCompleteSignup
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/login", showLogin);
authRouter.get("/signup", showSignup);


router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/logout", handleLogout);

router.post("/complete_signup", handleCompleteSignup)


authRouter.get("/profile", showProfile);

export default authRouter;
