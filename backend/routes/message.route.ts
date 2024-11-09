import express from "express";
import requireAuth from "../middleware/requireAuth";

const router = express.Router();

router.use(requireAuth);

router.get("/", getMessages);

router.post("/send", createMessage);