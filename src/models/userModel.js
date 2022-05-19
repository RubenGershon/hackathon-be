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
    gender: { type: Number },
    age: { type: Number, min: 0, max: 4 },
    fitness_level: { type: Number, min: 0, max: 4 },
    exercise_frequency: { type: Number, min: 0, max: 5 },
    participate_running: {
      type: Number,
    },
    participate_gym: {
      type: Number,
    },
    participate_team: {
      type: Number,
    },
    participate_dance: {
      type: Number,
    },
    participate_yoga: {
      type: Number,
    },
    participate_swimming: {
      type: Number,
    },
    participate_lifting_weights: {
      type: Number,
    },
    time_of_exercise_early_morning: {
      type: Number,
    },
    time_of_exercise_afternoon: {
      type: Number,
    },
    time_of_exercise_evening: {
      type: Number,
    },
    health: {
      type: Number,
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
    dist: {
      type: Number,
    },
    area: {
      type: Number,
    },
    mock_id: { type: Number },
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
