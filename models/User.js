import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const saltRound = await bcrypt.genSalt(10);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltRound);
  next();
});

UserSchema.methods.comparePassword = async (pass, userPass) => {
  return await bcrypt.compare(pass, userPass);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = model("User", UserSchema);

export default User;
