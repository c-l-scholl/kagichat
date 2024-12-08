import useAuth from "@/hooks/useAuthContext";
import "./chat.styles.css";
import { 
	DisplayMessageType, 
	// MessageType 
} from "@/utils/types";
import ChatMessage from "@/components/chat-message";
import { useState, useRef, useEffect } from "react";
import useKeys from "@/hooks/useKeys";
import useMessaging from "@/hooks/useMessaging";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const Chat = () => {
	// hooks
	const { state } = useAuth();
	const msgFetchTools = useMessaging();
	const encTools = useKeys();

	// state variables
	const [readMessages, setReadMessages] = useState<DisplayMessageType[] | null>(null);
	const [conversationId, setConversationId] = useState<string>("");
	const [formValue, setFormValue] = useState<string>("");

	// params
	const { receiverUid } = useParams<string>();

	const dummy = useRef<HTMLDivElement | null>(null);

	const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const uid = state.authUser?.uid;
		const sharedSecret = await encTools.deriveSharedSecret(receiverUid ?? "");
		const encryptedMessage = encTools.encryptMessage(formValue, sharedSecret);

		const response = await fetch("/api/messages/send", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				senderId: uid,
				receiverId: receiverUid,
				conversationId: conversationId,
				encryptedText: encryptedMessage,
			}),
		});

		const sendRes = await response.json();

		if (!response.ok) {
			console.error(sendRes.error);
		}

		if (response.ok) {
			// get Messages again
			const getConversationMessages = async () => {
				// get encrypted messages
				const conversation = await msgFetchTools.getConversation(
					conversationId
				);

				// shared secret
				const sharedSecret = await encTools.deriveSharedSecret(
					receiverUid ?? ""
				);

				// set messages for display and decrypt
				const preppedMessages = msgFetchTools.preppedMessagesForDisplay(
					conversation,
					sharedSecret
				);

				setReadMessages(preppedMessages);
			};
			getConversationMessages();
		}

		setFormValue("");
	};


	useEffect(() => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
	}, [readMessages, setReadMessages]);

	// get messages at start of chat
	useEffect(() => {
		const prepConversation = async () => {
			// get conversationId
			const [id1, id2] = [receiverUid, state.authUser?.uid].sort();
			const combined: string = `${id1}-${id2}`;
			const hashedConversationId = CryptoJS.SHA256(combined).toString();
			// console.log("conversationId", hashedConversationId);
			setConversationId(hashedConversationId);

			// get encrypted messages
			const conversation = await msgFetchTools.getConversation(
				hashedConversationId
			);

			// shared secret
			const sharedSecret = await encTools.deriveSharedSecret(receiverUid ?? "");
				
			// set messages for display and decrypt
			const preppedMessages = msgFetchTools.preppedMessagesForDisplay(
				conversation,
				sharedSecret
			);
			setReadMessages(preppedMessages);

			// console.log(preppedMessages);
		};
		prepConversation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const pollMessages = async () => {
		try {
			const conversation = await msgFetchTools.getConversation(
				conversationId
			);

			// shared secret
			const sharedSecret = await encTools.deriveSharedSecret(
				receiverUid ?? ""
			);
			// set messages for display and decrypt
			const preppedMessages = msgFetchTools.preppedMessagesForDisplay(
				conversation,
				sharedSecret
			);
			// need to verify messages somewhere in here
			setReadMessages(preppedMessages);
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	useEffect(() => {

		const intervalId: NodeJS.Timeout = setInterval(pollMessages, 15000); // 15 seconds
		dummy.current?.scrollIntoView({ behavior: "smooth" });
		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [conversationId]);

	return (
		<div className="chat-room">
			{readMessages &&
					readMessages.map((msg) => (
						<ChatMessage key={msg._id} message={msg} />
					))}
				<div ref={dummy}></div>

			<form onSubmit={sendMessage}>
				<input
					value={formValue}
					onChange={(event) => setFormValue(event.target.value)}
					placeholder="Say something nice..."
				/>

				<button type="submit" disabled={!formValue}>
					Send
				</button>
			</form>
		</div>
	);
};

export default Chat;
