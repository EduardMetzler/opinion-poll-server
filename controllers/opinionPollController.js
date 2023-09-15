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
    }).select(["-__v", "-questions"]);

    res.status(200).json(allMyOpinionPollsList);
  } catch (error) {
    next(createError(500, { msg: "Server Error!" }));
  }
};

export const getMyOpinionPoll = async (req, res, next) => {
  try {
    const oneOpinionPoll = await OpinionPoll.findById(req.params._id).select([
      "-__v",
    ]);
    if (req.user.userId == oneOpinionPoll.owner) {
      return res.status(200).json(oneOpinionPoll);
    }
  } catch (error) {
    next(createError(500, { msg: "Server Error!" }));
  }
};

export const getOpinionPoll = async (req, res, next) => {
  try {
    const oneOpinionPoll = await OpinionPoll.findById(req.params._id).select([
      "-__v",
    ]);

    return res.status(200).json(oneOpinionPoll);
  } catch (error) {
    next(createError(500, { msg: "Server Error!" }));
  }
};

export const postOpinionPollVote = async (req, res, next) => {
  try {
    const { select } = req.body;

    const data = await OpinionPoll.findById(req.params._id);
    // console.log(data.questions[select]);

    const oneOpinionPoll = await OpinionPoll.findOneAndUpdate(
      {
        _id: req.params._id,
        "questions.id": select,
      },
      { $set: { "questions.$.vote": data.questions[select].vote + 1 } },
      {
        new: true,
      }
    ).select(["-__v"]);
    // console.log(oneOpinionPoll);

    return res.status(200).json(oneOpinionPoll);
  } catch (error) {
    next(createError(500, { msg: "Server Error!" }));
  }
};
