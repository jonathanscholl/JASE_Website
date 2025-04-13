import express from "express";
import {
  showLogin,
  showSignup,
  handleLogin,
  handleSignup,
  handleLogout,
  showProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", showLogin);
router.get("/signup", showSignup);


router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/logout", handleLogout);


router.get("/profile", showProfile);

export default router;
