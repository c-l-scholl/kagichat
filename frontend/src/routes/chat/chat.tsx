import useAuth from "@/hooks/useAuthContext";
import "./chat.styles.css";
import { MerchantType, MessageType } from "@/utils/types";
import ChatMessage from "@/components/chat-message";
import { useState, useRef, useEffect } from "react";
import useEncryption from "@/hooks/useEncryption";

const Chat = (props: { recieverMerchant: MerchantType }) => {
	const { state } = useAuth();
	const encTools = useEncryption();
	const [messages, setMessages] = useState<MessageType[] | null>(null);
	const [conversationId, setConversationId] = useState<string>("");
	const [receiverPublicKey, setReceiverPublicKey] = useState<string>("");
	const [formValue, setFormValue] = useState<string>("");

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
		const sharedSecret = encTools.deriveSharedSecret(receiverPublicKey);
		const encryptedMessage = encTools.encryptMessage(formValue, sharedSecret);

		const msgHash = encTools.createMsgHash(formValue);
		const signature = encTools.getSignature(msgHash);

		setFormValue("");
	};

	useEffect(() => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);


	// get messages at start of chat
	useEffect(() => {

		// get receiver public key
		const getReceiverPK = async (receiverUid: string) => {
			const receiverPK = await encTools.getRecipientPublicKey(receiverUid);
			setReceiverPublicKey(receiverPK);
		}
		getReceiverPK(props.recieverMerchant.uid);

		// calculate conversation id
		const [uid1, uid2] = [props.recieverMerchant.uid, state.authUser?.uid].sort();
		const combined: string = `${uid1}-${uid2}`;
		setConversationId(CryptoJS.SHA256(combined).toString());

		// get messages from mongo
		

		
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
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
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
