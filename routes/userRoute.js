import express from "express";
import {
  registerValidationRules,
  validate,
} from "../middleware/userValidation.js";

import {
  register,
  login,
  checkCookie,
  clearCookie,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", registerValidationRules, validate, register);

router.post("/login", login);

router.post("/checkCookie", authenticate, checkCookie);
router.get("/clearCookie", clearCookie);

export default router;
