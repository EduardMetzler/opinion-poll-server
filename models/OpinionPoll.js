import { Schema, model } from "mongoose";

export const OpinionPollSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  questions: [
    {
      type: Object,
      required: true,
      minlength: 1,
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const OpinionPoll = model("OpinionPollSchema", OpinionPollSchema);

export default OpinionPoll;
