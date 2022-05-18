import express from "express";
import { getUser, update } from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const router = express.Router();

router.get("/getUser", tokenValidation, getUser);
router.put("/update", tokenValidation, update);

export default router;
