import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { getMessages, sendMessage } from "../controller/message.controller.js"

const router = express.Router();

router.use(requireAuth);

router.get("/:id", getMessages);

router.post("/send", sendMessage);

export default router;