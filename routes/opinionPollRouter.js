import express from "express";
import { createOpinionPoll } from "../controllers/opinionPollController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/create", authenticate, createOpinionPoll);

export default router;
