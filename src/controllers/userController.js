import { findUserById } from "../queries/userQueries.js";

function getUser(req, res) {
  res.status(200).json({ status: "ok", data: req.user });
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
    if ("time_of_excercice_earlymorning" in req.body)
      user.time_of_excercice_earlymorning =
        req.body.time_of_excercice_earlymorning;
    if ("time_of_excercice_afternoon" in req.body)
      user.time_of_excercice_afternoon = req.body.time_of_excercice_afternoon;
    if ("time_of_excercice_evening" in req.body)
      user.time_of_excercice_evening = req.body.time_of_excercice_evening;
    if ("health" in req.body) user.health = req.body.health;
    if ("location" in req.body) user.location = req.body.location;

    await user.save();

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

export { getUser, update };
