import express from "express";
import requireAuth from "../middleware/requireAuth";
import { getMessages, sendMessage } from "../controller/message.controller"

const router = express.Router();

router.use(requireAuth);

router.get("/:id", getMessages);

router.post("/send", sendMessage);