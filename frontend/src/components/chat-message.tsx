import useAuth from "@/hooks/useAuthContext";
import "./styles/chat-message.styles.css";
import { DisplayMessageType } from "@/utils/types";

const ChatMessage = (props: { message: DisplayMessageType }) => {
	const { state } = useAuth();
	const { senderUid, text } = props.message;

	const messageClass =
		senderUid === (state.authUser?.uid !== null && state.authUser?.uid) ? "sent" : "received";
	return (
		<div className={`message ${messageClass}`}>
			{/* <img src={photoUrl} /> */}
			<p>{text}</p>
		</div>
	);
};

export default ChatMessage;
