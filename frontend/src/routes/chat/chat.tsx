import useAuth from "@/hooks/useAuthContext";
import "./chat.styles.css";
import { DisplayMessageType, MessageType } from "@/utils/types";
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
	const [safeMessages, setSafeMessages] = useState<MessageType[] | null>(null);
	const [readMessages, setReadMessages] = useState<DisplayMessageType[] | null>(null);
	const [conversationId, setConversationId] = useState<string>("");
	const [formValue, setFormValue] = useState<string>("");

	// params
	const { receiverUid } = useParams();

	const dummy = useRef<HTMLDivElement | null>(null);

	const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const uid = state.authUser?.uid;
		const privKey: string | null = localStorage.getItem("privateKey");
		if (!privKey) {
			console.log("no private key found");
			return;
		}
		// const keyPair = ec.keyFromPrivate(privKey);
		if (!state.authUser) {
			console.log("no auth user");
			return;
		}

		if (!receiverUid) {
			console.log("no receiver uid");
			return;
		}
		const sharedSecret = await encTools.deriveSharedSecret(state.authUser.uid, receiverUid);
		const encryptedMessage = encTools.encryptMessage(formValue, sharedSecret);

		const msgHash = encTools.createMsgHash(formValue);
		const signature = encTools.getSignature(msgHash);

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
				signature: signature,
			})
		})

		const sendRes = await response.json();

		if (!response.ok) {
			console.error(sendRes.error);
		}

		if (response.ok) {
			// get Messages again
			const getConversationMessages = async () => {
				const conversation  = await msgFetchTools.getConversation(conversationId);
				setSafeMessages(conversation ?? null);
				if (!receiverUid) {
					console.log("no recieverUid found");
					return;
				}
				if (!state.authUser) {
					console.log("no auth user");
					return;
				}
				const sharedSecret = await encTools.deriveSharedSecret(state.authUser.uid, receiverUid);
				const preppedMessages = safeMessages?.map((msg) => {
					const decryptedText = encTools.decryptMessage(msg.encryptedText, sharedSecret);
					return {
						_id: msg._id,
						text: decryptedText,
						senderUid: msg.senderUid,
						createdAt: msg.createdAt
					};
				}) as DisplayMessageType[];
				// need to verify messages somewhere in here
				setReadMessages(preppedMessages);
			}
			getConversationMessages();
		}

		setFormValue("");
	};

	useEffect(() => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
	}, [readMessages, safeMessages, setReadMessages]);


	// get messages at start of chat
	useEffect(() => {

		const prepConversation = async () => {

			// get conversationId
			const [id1, id2] = [receiverUid, state.authUser?.uid].sort();
			const combined: string = `${id1}-${id2}`;
			const hashedConversationId = CryptoJS.SHA256(combined).toString();
			console.log("conversationId", hashedConversationId);
			setConversationId(hashedConversationId);
			
			// get encrypted messages
			const conversation = await msgFetchTools.getConversation(hashedConversationId);
			if (!conversation) {
				console.log("no messages between these two users");
			}
			setSafeMessages(conversation);

			if (!receiverUid) {
				console.log("no recieverUid in preppedMessages");
				return;
			}

			if (!state.authUser) {
				console.log("no current uid");
				return;
			}
			
			// shared secret
			const sharedSecret = await encTools.deriveSharedSecret(state.authUser.uid, receiverUid);
			
			// decrypt messages for display
			const preppedMessages = conversation?.map((msg) => {
			
				const decryptedText = encTools.decryptMessage(msg.encryptedText, sharedSecret);
				return {
					_id: msg._id,
					text: decryptedText,
					senderUid: msg.senderUid,
					createdAt: msg.createdAt
				};
			}) as DisplayMessageType[];
			// need to verify messages somewhere in here
			setReadMessages(preppedMessages);
			console.log(preppedMessages);
		}
		prepConversation();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// use setInterval method to poll messages every 15-30 seconds, or whenever the user sends a message
	// should be able to decrypt with the recipient public key and private key for all messages

	// get recipient public Key (inside use effect)
	// get using Merchant.findOne({ uid }) since we already have id property
	// probably should extrapolate all encryption and decryption into a hook

	

	return (
		<div className="chat-room">
			<div className="message-container">
				{msgFetchTools.isMessagesLoading && <span>Loading... </span>}
				{readMessages &&
					readMessages.map((msg) => <ChatMessage key={msg._id} message={msg} />)}
				<div ref={dummy}></div>
			</div>

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
