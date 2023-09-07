import createError from "http-errors";
import OpinionPoll from "../models/OpinionPoll.js";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const createOpinionPoll = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, questions } = req.body;
    const opinionPoll = new OpinionPoll({
      title,
      questions,
      owner: req.user.userId,
    });

    await opinionPoll.save();

    res.status(200).json({ msg: "Your poll is created 🙂 " });
  } catch (error) {
    next(createError(500, { msg: "Server Error!" }));
  }
};

export const getAllMyOpinionPollsList = async (req, res, next) => {
  try {
    const allMyOpinionPollsList = await OpinionPoll.find({
      owner: req.user.userId,
    }).select("-__v");

    res.status(200).json(allMyOpinionPollsList);
  } catch (error) {
    next(createError(500, { msg: "Server Error!" }));
  }
};
