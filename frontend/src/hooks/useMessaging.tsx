import { DisplayMessageType, MessageType } from "@/utils/types";
import { useState } from "react";
import useKeys from "./useKeys";

const useMessaging = () => {
	const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
	const [messsageError, setMessageError] = useState(null);
	const encTools = useKeys();

	const getConversation = async (conversationId: string): Promise<MessageType[]> => {
		if (!conversationId) {
			console.log("cannot fetch messages because conversationId is null");
			return [];
		}
		setIsMessagesLoading(true);
		setMessageError(null);

		const response = await fetch(`/api/messages/${conversationId}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			}
		})
	
		const jsonRes = await response.json();

		if (!response.ok) {
			setIsMessagesLoading(false);
			setMessageError(jsonRes.error);
			return [];
		}

		setIsMessagesLoading(false);
		const encryptedMessages = jsonRes as MessageType[];

		return encryptedMessages ?? [];

	}

	const preppedMessagesForDisplay = (conversation: MessageType[], sharedSecret: string) => {
		const preppedMessages = conversation?.map((msg) => {
			
			const decryptedText = encTools.decryptMessage(msg.encryptedText, sharedSecret);
			return {
				_id: msg._id,
				text: decryptedText,
				senderUid: msg.senderUid,
				createdAt: msg.createdAt
			};
		}) as DisplayMessageType[];
		return preppedMessages;
	}

	return { getConversation, preppedMessagesForDisplay, isMessagesLoading, messsageError };
}

export default useMessaging;