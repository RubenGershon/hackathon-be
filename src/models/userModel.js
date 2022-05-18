import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueArray from "mongoose-unique-array";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    gender: { type: Boolean, required: true },
    age: { type: Number, required: true, min: 0, max: 4 },
    fitness_level: { type: Number, required: true, min: 0, max: 4 },
    excercice_frequency: { type: Number, required: true, min: 0, max: 5 },
    participate_running: {
      type: String,
      maxlength: 50,
    },
    participate_gym: {
      type: String,
      maxlength: 50,
    },
    participate_team: {
      type: String,
      maxlength: 50,
    },
    participate_dance: {
      type: String,
      maxlength: 50,
    },
    participate_yoga: {
      type: String,
      maxlength: 50,
    },
    participate_swimming: {
      type: String,
      maxlength: 50,
    },
    participate_lifting_weights: {
      type: String,
      maxlength: 50,
    },
    time_of_earlymorning: {
      type: String,
      required: true,
      maxlength: 50,
    },
    time_of_excercice_afternoon: {
      type: String,
      maxlength: 50,
    },
    time_of_evening: {
      type: String,
      maxlength: 50,
    },
    health: {
      type: Boolean,
    },
    location: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "users" }
);

// Automatically hash new or updated password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.plugin(uniqueArray);
const userModel = mongoose.model("UserSchema", UserSchema);

export default userModel;
