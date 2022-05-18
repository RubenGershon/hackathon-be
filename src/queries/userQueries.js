import userModel from "../models/userModel.js"

async function findUserById(id) {
  try {
    const user = await userModel.findById(id);
    if (user) {
      return { status: "ok", data: user };
    } else {
      return { status: "error", message: "user not found" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function findByQuery(query) {
  try {
    const user = await userModel.find(query);
    if (user) {
      return { status: "ok", data: user };
    } else {
      return { status: "error", message: "user not found" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

export { findUserById, findByQuery };
