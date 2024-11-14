import { MessageType } from "@/utils/types";
import { useState } from "react";

const useMessaging = () => {
	const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
	const [messsageError, setMessageError] = useState(null);

	const getConversation = async (conversationId: string) => {
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
		}

		if (response.ok) {
			setIsMessagesLoading(false);
			const encryptedMessages = jsonRes as MessageType[];
			return encryptedMessages;
		}

	}

	return { getConversation, isMessagesLoading, messsageError };
}

export default useMessaging;