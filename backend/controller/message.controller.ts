import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import Message from "../models/message.model.js";
import exp from "constants";
import { MessageType } from "../utils/types.js";
import BadRequestError from "../middleware/errorTypes/BadRequestError.js";

dotenv.config();

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
	// get messages by conversation id
	// will handle sorting on the front end
	try {
		const conversationId = req.params.id;
		const messages = await Message.find({ conversationId })
			.sort({ createdAt: 1 })
			.exec();
		res.status(200).json(messages);
	} catch (err) {
		console.error("Error querying messages:", err);
		next(err);
	}
};

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userInput = req.body;
		// get all parameters:
		// senderId, recipientId, conversationId, encryptedText, signature
		// frontend will calculate conversationId (sort uids, append with "-", hash?)

		if (
			!userInput.senderId ||
			!userInput.receiverId ||
			!userInput.conversationId ||
			!userInput.encryptedText ||
			!userInput.signature
		) {
			throw new BadRequestError({
				code: 400,
				message: "Please provide all necessary message fields"
			})
		}

		const newMessage = new Message({
			senderId: userInput.senderId,
			receiverId: userInput.receiverId,
			conversationId: userInput.conversationId,
			encryptedText: userInput.encryptedText,
			signature: userInput.signature,
		});

		await newMessage.save();
		res.status(201).json({ message: `Message sent from ${newMessage.senderId} to ${newMessage.receiverId}` });
	} catch (err) {
		console.error("Error sending message:", err);
		next(err);
	}
};

export { getMessages, sendMessage };
