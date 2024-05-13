import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {
  register(req: Request, res: Response): Promise<UserDocument>;
  login(req: Request, res: Response): Promise<UserDocument>;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//custom methods
UserSchema.statics.register = async function (req: Request, _res: Response) {
  const { name, email, password } = req.body;

  //this - User model
  const isExistedUser = await this.findOne({ email });
  if (isExistedUser) {
    throw new Error("user already exists");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hashedPassword });

  return user;
};

UserSchema.statics.login = async function (req: Request, _res: Response) {
  const { email, password } = req.body;

  //this - User model
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("user does not exist");
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (isCorrect) return user;
  throw new Error("Incorrect password");
};

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export default User;
