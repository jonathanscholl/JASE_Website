import express from "express";
import {
  showLogin,
  showSignup,
  handleLogin,
  handleSignup,
  handleLogout,
  showProfile,
  handleCompleteSignup,
  handleOAuthCallback,
  handleAppleSignIn
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", showLogin);
router.get("/signup", showSignup);


router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/logout", handleLogout);

router.post("/complete_signup", handleCompleteSignup)


router.get("/profile", showProfile);
router.get("/auth/callback", handleOAuthCallback);
router.post("/auth/apple", handleAppleSignIn);

export default router;
