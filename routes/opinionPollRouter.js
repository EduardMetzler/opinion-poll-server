import express from "express";
import {
  createOpinionPoll,
  getAllMyOpinionPollsList,
} from "../controllers/opinionPollController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/create", authenticate, createOpinionPoll);
router.get(
  "/get-all-my-opinionPolls-list",
  authenticate,
  getAllMyOpinionPollsList
);

export default router;
