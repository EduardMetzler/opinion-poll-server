import express from "express";
import {
  createOpinionPoll,
  getAllMyOpinionPollsList,
  getMyOpinionPoll,
  getOpinionPoll,
  postOpinionPollVote,
  getAllOpinionPollsListLinkFasl,
} from "../controllers/opinionPollController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/create", authenticate, createOpinionPoll);
router.post(
  "/get-all-my-opinionPolls-list",
  authenticate,
  getAllMyOpinionPollsList
);

router.post("/get-my-opinion-poll/:_id", authenticate, getMyOpinionPoll);
router.post("/:_id", getOpinionPoll);
router.put("/vote/:_id", postOpinionPollVote);
router.get(
  "/get-all-opinion-polls-list-link-fasl",
  getAllOpinionPollsListLinkFasl
);

export default router;
