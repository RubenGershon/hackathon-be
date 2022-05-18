import express from "express";
import multer from "multer";
import { findMatch, getUser, update } from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const router = express.Router();
const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

router.get("/getUser", tokenValidation, getUser);
router.put("/update", tokenValidation, upload.single("image"), update);
router.get("/findMatch", tokenValidation, findMatch);

export default router;
