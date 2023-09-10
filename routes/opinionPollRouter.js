import express from "express";
import {
  createOpinionPoll,
  getAllMyOpinionPollsList,
  getMyOpinionPoll,
} from "../controllers/opinionPollController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/create", authenticate, createOpinionPoll);
router.get(
  "/get-all-my-opinionPolls-list",
  authenticate,
  getAllMyOpinionPollsList
);

router.get("/get-my-opinion-poll/:_id", authenticate, getMyOpinionPoll);

export default router;
