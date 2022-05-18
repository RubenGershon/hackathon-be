import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueArray from "mongoose-unique-array";

const UserSchema = new mongoose.Schema(
  {
    userName: {
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
    gender: { type: Boolean },
    age: { type: Number, min: 0, max: 4 },
    fitness_level: { type: Number, min: 0, max: 4 },
    exercise_frequency: { type: Number, min: 0, max: 5 },
    participate_running: {
      type: Boolean,
    },
    participate_gym: {
      type: Boolean,
    },
    participate_team: {
      type: Boolean,
    },
    participate_dance: {
      type: Boolean,
    },
    participate_yoga: {
      type: Boolean,
    },
    participate_swimming: {
      type: Boolean,
    },
    participate_lifting_weights: {
      type: Boolean,
    },
    time_of_exercises_earlymorning: {
      type: Boolean,
    },
    time_of_exercises_afternoon: {
      type: Boolean,
    },
    time_of_exercises_evening: {
      type: Boolean,
    },
    health: {
      type: Boolean,
    },
    x_coordinate: {
      type: String,
    },
    y_coordinate: {
      type: String,
    },
    imageUrl: {
      type: String,
      maxlength: 1000,
    },
    publicImageId: {
      type: String,
      maxlength: 1000,
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
