import { findUserById, findByQuery } from "../queries/userQueries.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import axios from "axios";
const api = axios.create({
  baseURL: "http://ec2-3-121-232-127.eu-central-1.compute.amazonaws.com:8080/",
});

async function getUser(req, res) {
  const response = await findUserById(req.user._id);
  const user = response.data.toObject();
  delete user.password;
  res.status(200).json({ status: "ok", data: user });
}

async function findMatch(req, res) {
  const response = await api.get("get_matches?id=1&dist=5");
  const data = [];
  for (let i = 0; i < response.data.length; i++) {
    try {
      const findResponse = await findByQuery({ mock_id: response.data[i] });
      if (findResponse.status === "ok")
        data.push(findResponse.data[0].toObject());
    } catch (error) {
      //Do Nothing
    }
  }

  res.status(200).json({ status: "ok", data: data });
}

async function update(req, res) {
  const response = await findUserById(req.user._id);
  const user = response.data;

  try {
    if ("gender" in req.body) user.gender = req.body.gender;
    if ("age" in req.body) user.age = req.body.age;
    if ("fitness_level" in req.body)
      user.fitness_level = req.body.fitness_level;
    if ("exercise_frequency" in req.body)
      user.exercise_frequency = req.body.exercise_frequency;
    if ("participate_running" in req.body)
      user.participate_running = req.body.participate_running;
    if ("participate_gym" in req.body)
      user.participate_gym = req.body.participate_gym;
    if ("participate_team" in req.body)
      user.participate_team = req.body.participate_team;
    if ("participate_dance" in req.body)
      user.participate_dance = req.body.participate_dance;
    if ("participate_yoga" in req.body)
      user.participate_yoga = req.body.participate_yoga;
    if ("participate_swimming" in req.body)
      user.participate_yoga = req.body.participate_yoga;
    if ("participate_lifting_weights" in req.body)
      user.participate_lifting_weights = req.body.participate_lifting_weights;
    if ("time_of_exercise_early_morning" in req.body)
      user.time_of_exercise_early_morning =
        req.body.time_of_exercise_early_morning;
    if ("time_of_exercise_afternoon" in req.body)
      user.time_of_exercise_afternoon = req.body.time_of_exercise_afternoon;
    if ("time_of_exercise_evening" in req.body)
      user.time_of_exercise_evening = req.body.time_of_exercise_evening;
    if ("health" in req.body) user.health = req.body.health;
    if ("x_coordinate" in req.body) user.x_coordinate = req.body.x_coordinate;
    if ("y_coordinate" in req.body) user.y_coordinate = req.body.y_coordinate;
    if ("dist" in req.body) user.dist = req.body.dist;
    if ("area" in req.body) user.area = req.body.area;
    if ("mock_id" in req.body) user.mock_id = req.body.mock_id;

    if (req.file) {
      const uploadImg = await cloudinary.uploader.upload(req.file.path, {
        folder: "ITCHackathon",
      });

      uploadImg && fs.promises.unlink(req.file.path);
      user.imageUrl = uploadImg.secure_url;
      user.publicImageId = uploadImg.public_id;
    }
    await user.save();

    if (req.body.somethingspecific) {
      //htpp:
    }

    res.status(201).send({
      status: "ok",
      message: "user successfully updated",
    });
    return;
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
    return;
  }
}

async function getByQuery(req, res) {
  let query = null;
  if (req.query.queryStr) {
    query = JSON.parse(req.query.queryStr);
  } else if (req.query) query = req.query;
  else query = query ? query : {};

  const response = await findByQuery(query);
  if (response.status === "ok") {
    return res.status(200).send(response);
  } else {
    res.status(400).send(response);
  }
  return;
}

export { getUser, update, findMatch, getByQuery };
