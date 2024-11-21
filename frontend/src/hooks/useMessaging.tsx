import { MessageType } from "@/utils/types";
import { useState } from "react";

const useMessaging = () => {
	const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
	const [messsageError, setMessageError] = useState(null);

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
		console.log("messages:", encryptedMessages);

		return encryptedMessages;

	}

	return { getConversation, isMessagesLoading, messsageError };
}

export default useMessaging;