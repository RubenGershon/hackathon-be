import express from "express";
import multer from "multer";
import { getUser, update } from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const router = express.Router();
const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

router.get("/getUser", tokenValidation, getUser);
router.put("/update", tokenValidation, upload.single("image"), update);

export default router;
